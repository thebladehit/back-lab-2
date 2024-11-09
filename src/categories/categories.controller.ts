import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
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
