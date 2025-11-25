import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  //logica para agregar categorias
  addCategories(data: { category: string }[]) {
    return this.categoriesRepository.addCategories(data);
  }

  //retorna todas las categorias
  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
