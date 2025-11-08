import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from 'src/dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  //logica para agregar categorias
  addCategories(categoryDto: CreateCategoryDto) {
    return this.categoriesRepository.addCategories(categoryDto);
  }

  //retorna todas las categorias
  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
