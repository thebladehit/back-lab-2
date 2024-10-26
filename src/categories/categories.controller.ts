import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('category')
  createCategory(@Body('categoryName') categoryName: string) {
    return this.categoriesService.createCategory(categoryName);
  }

  @Get('categories')
  getAllUsers() {
    return this.categoriesService.getALlCategories();
  }

  @Get('category/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Delete('category/:id')
  deleteCategoryById(@Param('id') id: string) {
    return this.categoriesService.deleteCategoryById(id);
  }
}
