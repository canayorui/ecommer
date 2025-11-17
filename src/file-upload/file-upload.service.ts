import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    //verifica q exista el producto
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product)
      throw new NotFoundException(`Producto no encontrado: ${productId}`);
    //sube la imagen a cloudinary
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException(
        `Error al subir la imagen para el producto: ${productId}`,
      );
    }

    //actualiza la url de la imagen en el producto
    await this.productsRepository.update(productId, {
      imgUrl: response.secure_url,
    });
    console.log(`producto actualizado: ${productId}`);

    //retornar el producto actualizado
    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return updatedProduct;
  }
}
