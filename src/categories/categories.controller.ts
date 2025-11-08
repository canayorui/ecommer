import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from 'src/dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //logica para agregar categorias
  @Get('seeder')
  addCategories(categoryDto: CreateCategoryDto) {
    return this.categoriesService.addCategories(categoryDto);
  }

  //retorna todas las categorias
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
