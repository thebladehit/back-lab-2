import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecordService {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createRecord(dto: CreateRecordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User with such id does not exist');
    const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundException('Category with such id does not exist');
    const currencyName = dto.currency ? dto.currency : 'UAN';
    return this.prisma.record.create({
      data: {
        createdAt: new Date(dto.createdAt),
        amount: dto.amount,
        user: {
          connect: { id: dto.userId },
        },
        category: {
          connect: { id: dto.categoryId },
        },
        currency: {
          connectOrCreate: {
            where: { name: currencyName },
            create: { name: currencyName },
          },
        },
      },
    });
  }

  public getRecordByFilters(userId: string, categoryId: string) {
    if (!userId && !categoryId) {
      throw new BadRequestException('Provide either user id or category id or both');
    }
    return this.prisma.record.findMany({
      where: {
        AND: [
          userId ? { userId }: undefined,
          categoryId ? { categoryId } : undefined,
        ].find(Boolean),
      },
    });
  }

  public async getRecordById(id: string) {
    const record = await this.prisma.record.findUnique({ where: { id: id } });
    if (!record) throw new NotFoundException('No record with id: ' + id);
    return record;
  }

  public getALlRecords() {
    return this.prisma.record.findMany();
  }

  public async deleteRecordById(id: string) {
    const record = await this.prisma.record.findUnique({ where: { id: id } });
    if (!record) throw new NotFoundException('No record with id: ' + id);
    await this.prisma.record.delete({ where: { id: id } });
    return record;
  }
}
