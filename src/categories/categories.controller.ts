import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //logica para agregar categorias
  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  //retorna todas las categorias
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
