import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  //logica para agregar categorias
  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  //retorna todas las categorias
  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
