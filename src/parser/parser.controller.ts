import { Controller, Post, Body } from '@nestjs/common';

import { ParserService } from './parser.service';
import { FXQLPayloadDto } from './dto/fxql-dto';

@Controller('entry')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}
  @Post()
  async parser(@Body() body: FXQLPayloadDto) {
    return this.parserService.createEntry(body.FXQL);
  }
}
