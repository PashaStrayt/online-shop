import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { JwtPayloadType } from './types/jwt-payload.type';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  private generateJwt(payload: JwtPayloadType): string {
    return this.jwtService.sign(payload);
  }

  async getUserByLoginOrEmail(login?: string, email?: string): Promise<User | null> {
    const result = await this.userModel.findOne({ login }).exec() || await this.userModel.findOne({ email }).exec();
    return result;
  }

  async login(dto: AuthUserDto): Promise<string> {
    const user = await this.getUserByLoginOrEmail(dto.login, dto.email);
    if (!user) {
      throw new BadRequestException({ message: 'Такого аккаунта не существует' });
    }

    const doPasswordsMatch = await bcrypt.compare(dto.password, user.password);
    if (!doPasswordsMatch) {
      throw new BadRequestException({ message: 'Неправильный пароль' });
    }

    return this.generateJwt({
      id: user._id,
      login: user.login,
      email: user.email,
      roles: user.roles
    });
  }

  async register(dto: AuthUserDto): Promise<string> {
    if (!dto.login || !dto.email || !dto.password) {
      throw new HttpException('Не введены данные для регистрации', HttpStatus.BAD_REQUEST);
    }

    const doesSuchUserExist = await this.getUserByLoginOrEmail(dto.login, dto.email);
    if (doesSuchUserExist) {
      throw new HttpException('Пользователь с таким логином или email уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(dto.password, Number(process.env.HASH_SALT));
    const newUser = new this.userModel({ ...dto, password: hashedPassword });
    newUser.save();

    return this.generateJwt({ id: String(newUser._id), login: dto.login, email: dto.email, roles: ['USER'] });
  }
}