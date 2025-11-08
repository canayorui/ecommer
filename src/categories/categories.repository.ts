import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { Repository } from 'typeorm';
//import * as data from '../utils/data.json';
import { CreateCategoryDto } from 'src/dto/category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // metodo para obtener todas las categorias
  async getCategories() {
    return await this.categoriesRepository.find();
  }

  // este metodo crea un categoria
  async addCategories(categoryDto: CreateCategoryDto) {
    //logica para agregar categorias
    const existeCategory = await this.categoriesRepository.findOne({
      where: { name: categoryDto.name },
    });

    if (existeCategory) {
      throw new ConflictException(`La categoria ${categoryDto.name} ya existe`);
    }

    const newCategory = await this.categoriesRepository.save({
      name: categoryDto.name,
    });
    return newCategory;
  }
}
