import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { Repository } from 'typeorm';
//import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async addCategories(data: { name: string }[]): Promise<string> {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('data debe ser un array con al menos un elemento');
    }

    const normalizedNames = data
      .map((element) => element?.name?.trim())
      .filter((name): name is string => Boolean(name));

    if (normalizedNames.length === 0) {
      throw new Error('No se recibieron nombres de categorías válidos');
    }

    await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(normalizedNames.map((name) => ({ name })))
      .orIgnore()
      .execute();

    return 'categorías agregadas correctamente';
  }
}

// import { InjectRepository } from '@nestjs/typeorm';
// import { ConflictException, Injectable } from '@nestjs/common';
// import { Category } from '../entities/categories.entity';
// import { Repository } from 'typeorm';
// //import * as data from '../utils/data.json';
// import { CreateCategoryDto } from 'src/dto/category.dto';

// @Injectable()
// export class CategoriesRepository {
//   constructor(
//     @InjectRepository(Category)
//     private categoriesRepository: Repository<Category>,
//   ) {}

//   // metodo para obtener todas las categorias
//   async getCategories() {
//     return await this.categoriesRepository.find();
//   }

//   // este metodo crea un categoria
//   async addCategories(categoryDto: CreateCategoryDto) {
//     //logica para agregar categorias
//     const existeCategory = await this.categoriesRepository.findOne({
//       where: { name: categoryDto.name },
//     });

//     if (existeCategory) {
//       throw new ConflictException(`La categoria ${categoryDto.name} ya existe`);
//     }

//     const newCategory = await this.categoriesRepository.save({
//       name: categoryDto.name,
//     });
//     return newCategory;
//   }

//   async addCategoriesFromData() {
//     // Extraer categorías únicas desde data.json o definir manualmente
//     const categories = [
//       { name: 'smartphone' },
//       { name: 'monitor' },
//       { name: 'keyboard' },
//       { name: 'mouse' },
//     ];

//     for (const categoryData of categories) {
//       try {
//         const existingCategory = await this.categoriesRepository.findOne({
//           where: { name: categoryData.name },
//         });

//         if (!existingCategory) {
//           await this.categoriesRepository.save(categoryData);
//           console.log(`Categoría '${categoryData.name}' creada`);
//         }
//       } catch (error) {
//         console.error(`Error al crear categoría ${categoryData.name}:`, error);
//       }
//     }

//     return 'Categorías base cargadas correctamente';
//   }
// }
