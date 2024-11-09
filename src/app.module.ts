import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { RecordModule } from './record/record.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CategoriesModule,
    RecordModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
