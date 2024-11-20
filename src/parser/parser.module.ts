import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { ParserController } from './parser.controller';
import { ParserRepository } from './parser.repository';
import { PrismaService } from 'prisma.service';

@Module({
  providers: [ParserService, ParserRepository, PrismaService],
  controllers: [ParserController],
})
export class ParserModule {}
