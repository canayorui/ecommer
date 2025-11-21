import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El tamaño máximo del archivo es de 200KB',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|svg|webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return await this.fileUploadService.uploadImage(file, productId);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw new InternalServerErrorException(
        'Error al procesar la carga del archivo',
      );
    }
  }
}
