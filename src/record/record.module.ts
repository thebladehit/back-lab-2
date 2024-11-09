import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [RecordService, PrismaService],
  controllers: [RecordController]
})
export class RecordModule {}
