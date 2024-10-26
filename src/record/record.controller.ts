import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDto } from './dto/record.dto';

@Controller()
export class RecordController {
  constructor(private readonly recordService: RecordService) {
  }

  @Post('record')
  createRecord(@Body() recordDto: RecordDto) {
    return this.recordService.createRecord(recordDto);
  }

  @Get('record')
  getRecordByFilters(
    @Query('user_id') userId: string,
    @Query('category_id') categoryId: string
  ) {
    return this.recordService.getRecordByFilters(userId, categoryId);
  }

  @Get('records')
  getAllRecords() {
    return this.recordService.getALlRecords();
  }

  @Get('record/:id')
  getRecordById(@Param('id') id: string) {
    return this.recordService.getRecordById(id);
  }

  @Delete('record/:id')
  deleteRecordById(@Param('id') id: string) {
    return this.recordService.deleteRecordById(id);
  }
}
