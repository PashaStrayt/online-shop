import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { Brand } from './brands.schema';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() dto: CreateBrandDto): Promise<Brand> {
    return await this.brandService.create(dto);
  }
}
