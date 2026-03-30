import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import seedProducts from '../utils/data.json';

type SeedCategory = { name: string };
type SeedProduct = { category: string };

@Injectable()
export class CategoriesService {
  private readonly defaultCategories: SeedCategory[];

  constructor(private readonly categoriesRepository: CategoriesRepository) {
    this.defaultCategories = this.buildDefaultCategories();
  }

  private buildDefaultCategories(): SeedCategory[] {
    const uniqueCategories = Array.from(
      new Set(
        (seedProducts as SeedProduct[]).map((product) =>
          product.category.trim().toLowerCase(),
        ),
      ),
    );

    return uniqueCategories.map((name) => ({ name }));
  }

  //logica para agregar categorias
  addCategories(data: SeedCategory[] = this.defaultCategories) {
    return this.categoriesRepository.addCategories(data);
  }

  //retorna todas las categorias
  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
