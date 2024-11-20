import {
  IsString,
  IsNumber,
  Matches,
  Min,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class ParsedFXQLDto {
  @Matches(/^[A-Z]{3}$/, {
    message: 'Source currency must be 3 uppercase letters (e.g., USD).',
  })
  @IsString()
  @IsNotEmpty()
  SourceCurrency: string;

  @Matches(/^[A-Z]{3}$/, {
    message: 'Destination currency must be 3 uppercase letters (e.g., GBP).',
  })
  @IsString()
  @IsNotEmpty()
  DestinationCurrency: string;

  @IsNumber({}, { message: 'Buy price must be a valid number.' })
  @Min(0, { message: 'Buy price cannot be negative.' })
  @IsNotEmpty()
  BuyPrice: number;

  @IsNumber({}, { message: 'Sell price must be a valid number.' })
  @Min(0, { message: 'Sell price cannot be negative.' })
  @IsNotEmpty()
  SellPrice: number;

  @IsInt({ message: 'Cap amount must be a whole number.' })
  @Min(0, { message: 'Cap amount cannot be negative.' })
  @IsNotEmpty()
  CapAmount: number;
}
