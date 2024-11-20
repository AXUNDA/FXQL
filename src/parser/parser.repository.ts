import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { ParsedFXQLDto } from './dto/inner.dto';

@Injectable()
export class ParserRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async createEntry(dto: ParsedFXQLDto) {
    return await this.Prisma.entry.create({
      data: dto,
    });
  }
}
