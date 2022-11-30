import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './brands.schema';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) {}

  async create(dto: CreateBrandDto): Promise<Brand> {
    const newBrand = new this.brandModel(dto);
    return newBrand.save();
  }
}