import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 } from 'uuid';
import * as path from 'path';
import { writeFile } from 'fs/promises';
import { join, resolve } from 'path';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File): Promise<string> {
    try {
      const directory = resolve(__dirname, '..', '..', 'static');
      const fileName = v4() + '.jpg';

      await writeFile(resolve(directory, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new InternalServerErrorException({ message: 'Внутренняя ошибка сервера' });
    }
  }

  async createMany(files: Express.Multer.File[]) {
    return await Promise.all(files.map(async file => {
      return await this.create(file);
    }));
  }
}