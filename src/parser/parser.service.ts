import { BadRequestException, Injectable } from '@nestjs/common';
import { ParserRepository } from './parser.repository';
import { ParsedFXQLDto } from './dto/inner.dto';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class ParserService {
  constructor(private readonly parserRepository: ParserRepository) {}
  async createEntry(payload: string) {
    const formattedPayload = payload.replace(/\\n/g, '\n').trim();

    const statements = formattedPayload.split(/\n(?=[A-Z]{3}-[A-Z]{3} \{)/);

    if (!statements || statements.length === 0) {
      throw new BadRequestException('No FXQL statements found.');
    }
    if (statements.length > 1000) {
      throw new BadRequestException('maximum number of statements is 10000.');
    }

    const results = await Promise.all(
      statements.map(async (statement, index) => {
        console.log({ statement });

        const cleanStatement = statement.trim();

        const regex =
          /^([A-Z]{3})-([A-Z]{3}) \{\s*BUY (\d+(\.\d+)?)\s*SELL (\d+(\.\d+)?)\s*CAP (\d+)\s*\}$/;

        const match = cleanStatement.match(regex);
        if (!match) {
          throw new BadRequestException(
            `Invalid FXQL format in statement ${index + 1}. Ensure each statement matches the required structure.`,
          );
        }

        const [
          _,
          sourceCurrency,
          destinationCurrency,
          buyPrice,
          ,
          sellPrice,
          ,
          capAmount,
        ] = match;

        const parsedData = {
          SourceCurrency: sourceCurrency,
          DestinationCurrency: destinationCurrency,
          BuyPrice: parseFloat(buyPrice),
          SellPrice: parseFloat(sellPrice),
          CapAmount: parseInt(capAmount, 10),
        };

        const parsedFXQL = plainToClass(ParsedFXQLDto, parsedData);
        const errors = validateSync(parsedFXQL);
        if (errors.length > 0) {
          throw new BadRequestException(
            `Validation error in statement ${index + 1}: ${JSON.stringify(errors)}`,
          );
        }
        return await this.parserRepository.createEntry(parsedFXQL);
      }),
    );

    return {
      message: 'Rates Parsed Successfully.',
      code: 'FXQL-200',
      data: results,
    };
  }
}
