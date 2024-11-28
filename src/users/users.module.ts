import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfiles } from './entities/users_profile.entity';
import { UserProfilesAuth } from './entities/users_profiles_auth.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfiles, UserProfilesAuth])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
