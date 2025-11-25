import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //logica para agregar categorias(get http://localhost:3000/categories/seeder)
  @Get('seeder')
  addCategories() {
    const data = [{ category: 'Nueva Categoria' }]; // Ejemplo de datos
    return this.categoriesService.addCategories(data);
  }

  //retorna todas las categorias(get http://localhost:3000/categories)
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
