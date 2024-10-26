import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from '../utils/utils';

export interface Category {
  id: string;
  categoryName: string;
}

@Injectable()
export class CategoriesService {
  private categoryStorage: Category[] = [];

  public createCategory(categoryName: string) {
    if (!categoryName) throw new BadRequestException('Provide category name');
    const id = generateId();
    this.categoryStorage.push({ categoryName, id });
    return this.categoryStorage[this.categoryStorage.length - 1];
  }

  public getCategoryById(id: string) {
    const category = this.categoryStorage.find(category => category.id === id);
    if (!category) throw new NotFoundException('No category with id: ' + id);
    return category;
  }

  public getALlCategories() {
    return this.categoryStorage;
  }

  public deleteCategoryById(id: string) {
    const category = this.categoryStorage.find(category => category.id === id);
    if (!category) throw new NotFoundException('No category with id: ' + id);
    this.categoryStorage = this.categoryStorage.filter(category => category.id !== id);
    return category;
  }
}
