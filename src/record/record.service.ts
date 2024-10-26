import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from '../utils/utils';
import { RecordDto } from './dto/record.dto';

export interface Record {
  id: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  amount: number;
}

@Injectable()
export class RecordService {
  private recordStorage: Record[] = [];

  private validateRecordData(data: RecordDto) {
    if (!data.userId) throw new BadRequestException('Provide user id');
    if (!data.categoryId) throw new BadRequestException('Provide category id');
    if (!data.createdAt) throw new BadRequestException('Provide date');
    if (!data.amount) throw new BadRequestException('Provide amount');
    if (isNaN(+data.amount)) throw new BadRequestException('Provide correct amount');
    const date = new Date(data.createdAt);
    if (isNaN(+date.getTime())) throw new BadRequestException('Provide correct date');
  }

  public createRecord(recordDto: RecordDto) {
    this.validateRecordData(recordDto);
    const id = generateId();
    this.recordStorage.push({
      ...recordDto,
      id,
      amount: +recordDto.amount,
      createdAt: new Date(recordDto.createdAt),
    });
    return this.recordStorage[this.recordStorage.length - 1];
  }

  public getRecordByFilters(userId: string, categoryId: string) {
    if (!userId && !categoryId) {
      throw new BadRequestException('Provide either user id or category id or both');
    }
    return this.recordStorage.filter(
      record => (
        (userId ? record.userId === userId : true)
        &&
        (categoryId ? record.categoryId === categoryId : true))
    );
  }

  public getRecordById(id: string) {
    const record = this.recordStorage.find(record => record.id === id);
    if (!record) throw new NotFoundException('No record with id: ' + id);
    return record;
  }

  public getALlRecords() {
    return this.recordStorage;
  }

  public deleteRecordById(id: string) {
    const record = this.recordStorage.find(record => record.id === id);
    if (!record) throw new NotFoundException('No record with id: ' + id);
    this.recordStorage = this.recordStorage.filter(record => record.id !== id);
    return record;
  }
}
