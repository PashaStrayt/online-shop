import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: String(process.env.SECRET_KEY),
      signOptions: {
        expiresIn: '24h'
      }
    }),
    FilesModule
  ],
  providers: [UsersService, RolesGuard],
  controllers: [UsersController],
  exports: [JwtModule]
})
export class UsersModule { }