import { UploadApiResponse, v2 } from 'cloudinary';
import bufferToStream from 'buffer-to-stream';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error || !result) {
          reject(
            error instanceof Error
              ? error
              : new Error('Error desconocido durante la carga'),
          );
        } else {
          resolve(result);
        }
      });
      bufferToStream(file.buffer).pipe(upload);
    });
  }
}
