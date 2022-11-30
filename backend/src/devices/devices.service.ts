import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './devices.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    private fileService: FilesService
  ) { }

  async create(dto: CreateDeviceDto, images: Express.Multer.File[]): Promise<Device> {
    const imagesFileName = images?.length ? await this.fileService.createMany(images) : [];

    const newDevice = new this.deviceModel({ ...dto, images: imagesFileName });
    return newDevice.save();
  }

  async delete(id: string): Promise<object> {
    await this.deviceModel.deleteOne({ _id: id });

    return { message: 'Девайс успешно удален' };
  }
}