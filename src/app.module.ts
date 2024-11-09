import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { RecordModule } from './record/record.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CategoriesModule,
    RecordModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
