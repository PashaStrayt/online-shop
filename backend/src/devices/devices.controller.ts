import { Body, Controller, Delete, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DevicesService } from './devices.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/users/roles.decorator';
import { RolesGuard } from 'src/users/roles.guard';
import { Device } from './devices.schema';

@Controller('devices')
export class DevicesController {
  constructor(private deviceService: DevicesService) { }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  async create(@Body() dto: CreateDeviceDto, @UploadedFiles() images: Express.Multer.File[]): Promise<Device> {
    return await this.deviceService.create(dto, images);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete')
  async delete(@Param('id') id: string): Promise<object> {
    return await this.deviceService.delete(id);
  }
}