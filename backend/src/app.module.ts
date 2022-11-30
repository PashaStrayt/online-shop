import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(String(process.env.DB_URI)),
    ServeStaticModule.forRoot({ rootPath: resolve(__dirname, '..', 'static') }),
    UsersModule,
    FilesModule,
    CategoriesModule,
    BrandsModule
  ]
})
export class AppModule { }