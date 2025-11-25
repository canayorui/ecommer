import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { CreateProductDto } from 'src/dto/product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  //metodo para obtener todos los productos con paginacion
  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  // Método para obtener un producto por id
  async getProduct(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(
        `No se encontró el producto con el id: ${id}`,
      );
    }
    return product;
  }

  // Método para agregar un producto
  async addProduct() {
    const categories = await this.categoriesRepository.find();

    if (!Array.isArray(data)) {
      throw new Error('data debe ser un array');
    }
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (Category) => Category.name === element.category,
        );
        if (!category) {
          throw new NotFoundException(
            `Categoría ${element.category} no encontrada`,
          );
        }
        // Crea un nuevo producto
        await this.productsRepository
          .createQueryBuilder() // createQueryBuilder crea el constructor de consultas
          .insert() // insert => crea una consulta de inserción
          .into(Product) // Especifica la tabla/entidad
          .values({
            name: element.name,
            description: element.description,
            price: element.price,
            stock: element.stock,
            category: category,
          })
          .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name']) // Si existe, actualiza los campos especificados
          .execute(); // Ejecuta la consulta
      }),
    );
    return 'Productos agregados correctamente';
  }

  // Este método crea un nuevo producto.
  async updateProduct(id: string, productNewData: CreateProductDto) {
    await this.productsRepository.update(id, productNewData);
    // Verifica si el producto existe
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    // Si no se encuentra el producto, retorna un mensaje
    if (!updatedProduct) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    // Object.assign actualiza el producto con los nuevos datos
    Object.assign(updatedProduct, productNewData);
    // Retorna el id del producto actualizado
    return id;
  }

  // Este método elimina un producto por id
  async deleteProduct(id: string): Promise<string> {
    // Busca el producto por id
    const product = await this.productsRepository.findOne({ where: { id } });
    // Si no se encuentra el producto, retorna un mensaje
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    // Elimina el producto de la base de datos
    await this.productsRepository.remove(product);
    // Retorna el id del producto eliminado
    return id;
  }
}
