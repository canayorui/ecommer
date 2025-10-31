import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    //logica para agregar categorias
    data.map(async (element) => {
      await this.categoriesRepository
        .createQueryBuilder() // createQuerybuilder crea el constructor de consultas
        .insert() // insert => crea una consulta de inserción
        .into(Category) //Especifica la tabla/entidad
        .values({ name: element.category }) //valores a insertar
        .orIgnore() // Si existe, lo ignora (no error)
        .execute(); // Ejecuta la consulta
    });

    return 'categorias agregadas correctamente';
  }
}
