import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //logica para agregar categorias(get http://localhost:3000/categories/seeder)
  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  //retorna todas las categorias(get http://localhost:3000/categories)
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
