import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';

export interface Category {
  id: string;
  categoryName: string;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createCategory(dto: CreateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { categoryName: dto.categoryName } });
    if (category) throw new BadRequestException('Category with such name already exists');
    return this.prisma.category.create({ data: dto });
  }

  public async getCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('No category with id: ' + id);
    return category;
  }

  public getALlCategories() {
    return this.prisma.category.findMany();
  }

  public async deleteCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('No category with id: ' + id);
    await this.prisma.category.delete({ where: { id } });
    return category;
  }
}
