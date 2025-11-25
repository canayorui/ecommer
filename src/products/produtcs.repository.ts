import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Product } from '../entities/products.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from 'src/dto/product.dto';
import productSeedData from '../utils/data.json';

type SeedProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imgUrl?: string;
};

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

  //metodo para obtener un producto por id
  async getProduct(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(
        `No se encontro el producto con el id: ${id}`,
      );
    }
    return product;
  }

  //metodo para agregar un producto
  async addProduct(data: SeedProduct[] = productSeedData as SeedProduct[]) {
    if (!Array.isArray(data)) {
      throw new Error("El parámetro 'data' debe ser un array.");
    }

    if (data.length === 0) {
      return 'no hay productos para procesar';
    }

    const categories = await this.categoriesRepository.find();

    if (categories.length === 0) {
      throw new NotFoundException('No hay categorías registradas');
    }

    const categoriesByName = new Map(
      categories.map((category) => [category.name.toLowerCase(), category]),
    );

    const productNames = data.map((item) => item.name);
    const existingProducts = await this.productsRepository.find({
      where: { name: In(productNames) },
      relations: { category: true },
    });

    const existingProductsByName = new Map(
      existingProducts.map((product) => [product.name, product]),
    );

    const operations = data.map(async (item) => {
      const category = categoriesByName.get(item.category.toLowerCase());

      if (!category) {
        throw new NotFoundException(`Categoria ${item.category} no encontrada`);
      }

      const payload: Partial<Product> = {
        description: item.description,
        price: item.price,
        stock: item.stock,
        category,
      };

      if (item.imgUrl) {
        payload.imgUrl = item.imgUrl;
      }

      const existingProduct = existingProductsByName.get(item.name);

      if (existingProduct) {
        Object.assign(existingProduct, payload);
        await this.productsRepository.save(existingProduct);
        return;
      }

      const newProduct = this.productsRepository.create({
        name: item.name,
        ...payload,
      });

      await this.productsRepository.save(newProduct);
    });

    await Promise.all(operations);

    return 'productos agregados correctamente';
  }

  //este metodo crea un nuevo producto.
  async updateProduct(id: string, productNewData: CreateProductDto) {
    await this.productsRepository.update(id, productNewData);
    // verifica si el producto existe
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    // si no se encuentra el producto, retorna un mensaje
    if (!updatedProduct) {
      throw new NotFoundException(`producto con id: ${id} no encontrado`);
    }
    // Object.assign actualiza el producto con los nuevos datos
    Object.assign(updatedProduct, productNewData);
    // retorna el id del producto actualizado
    return id;
  }

  //este metodo elimina un producto por id
  async deleteProduct(id: string): Promise<string> {
    // busca el producto por id
    const product = await this.productsRepository.findOne({ where: { id } });
    // si no se encuentra el producto, retorna un mensaje
    if (!product) {
      throw new NotFoundException(`producto con id: ${id} no encontrado`);
    }
    // elimina el producto de la base de datos
    await this.productsRepository.remove(product);

    return `producto con id: ${id} eliminado correctamente`;
  }
}
