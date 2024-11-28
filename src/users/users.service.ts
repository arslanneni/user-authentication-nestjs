import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfiles } from './entities/users_profile.entity';
import { UserProfilesAuth } from './entities/users_profiles_auth.entity';
import * as argon2 from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserProfiles)
    private readonly userProfilesRepo: Repository<UserProfiles>,
    @InjectRepository(UserProfilesAuth)
    private readonly userProfilesAuthRepo: Repository<UserProfilesAuth>,
    private jwtService: JwtService,
  ) {}

  async getAllUsers() {
    try {
      const getAllUsersResult = await this.userProfilesRepo
        .createQueryBuilder('up')
        .innerJoinAndSelect('up.auth', 'uph')
        .select([
          'up.accountid as ACCOUNT_ID',
          'up.username as USER_NAME',
          'up.full_name as FULL_NAME',
          'up.dob as DOB',
          'up.status as STATUS',
          'uph.email as EMAIL',
          'uph.password as PASSWORD',
          'uph.jwt_token as JWT_TOKEN',
        ])
        .getRawMany();

      if (getAllUsersResult.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Users Found',
          data: getAllUsersResult,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No User Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error in getAllUsers:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getAllActiveUsers() {
    try {
      const getAllUsersResult = await this.userProfilesRepo
        .createQueryBuilder('up')
        .innerJoinAndSelect('up.auth', 'uph')
        .select([
          'up.accountid as ACCOUNT_ID',
          'up.username as USER_NAME',
          'up.full_name as FULL_NAME',
          'up.dob as DOB',
          'up.status as STATUS',
          'uph.email as EMAIL',
          'uph.password as PASSWORD',
          'uph.jwt_token as JWT_TOKEN',
        ])
        .where({
          status: 'ACTIVE',
        })
        .getRawMany();

      if (getAllUsersResult.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Active Users Found',
          data: getAllUsersResult,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Active User Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error in getAllUsers:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getInActiveUsers() {
    try {
      const getAllUsersResult = await this.userProfilesRepo
        .createQueryBuilder('up')
        .innerJoinAndSelect('up.auth', 'uph')
        .select([
          'up.accountid as ACCOUNT_ID',
          'up.username as USER_NAME',
          'up.full_name as FULL_NAME',
          'up.dob as DOB',
          'up.status as STATUS',
          'uph.email as EMAIL',
          'uph.password as PASSWORD',
          'uph.jwt_token as JWT_TOKEN',
        ])
        .where({
          status: 'INACTIVE',
        })
        .getRawMany();

      if (getAllUsersResult.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Active Users Found',
          data: getAllUsersResult,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Active User Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error in getAllUsers:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getUserDetailsByID(id: number) {
    try {
      const getAllUsersResult = await this.userProfilesRepo
        .createQueryBuilder('up')
        .innerJoinAndSelect('up.auth', 'uph')
        .select([
          'up.accountid as ACCOUNT_ID',
          'up.username as USER_NAME',
          'up.full_name as FULL_NAME',
          'up.dob as DOB',
          'up.status as STATUS',
          'uph.email as EMAIL',
          'uph.password as PASSWORD',
        ])
        .where({
          accountid: id,
        } as unknown)
        .getRawMany();

      if (getAllUsersResult.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'User Details Found',
          data: getAllUsersResult,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No User Details Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error in getAllUsers:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getUserCredentials(id: number) {
    try {
      const getAllUsersResult = await this.userProfilesRepo
        .createQueryBuilder('up')
        .innerJoinAndSelect('up.auth', 'uph')
        .select(['uph.email as EMAIL', 'uph.password as PASSWORD'])
        .where({
          accountid: id,
        } as unknown)
        .getRawMany();

      if (getAllUsersResult.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'User Details Found',
          data: getAllUsersResult,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No User Details Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error in getAllUsers:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async registerUser(createUserDto: CreateUserDto) {
    try {
      // Check if email already exists
      const existingEmail = await this.userProfilesAuthRepo.findOne({
        where: { email: createUserDto.email },
      });

      if (existingEmail) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.BAD_REQUEST,
          message: 'Email already exists',
        };
      }

      // Check if username already exists
      const existingUser = await this.userProfilesRepo.findOne({
        where: { username: createUserDto.username },
      });
      if (existingUser) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.BAD_REQUEST,
          message: 'Username already exists',
        };
      }

      // Hash the password using Argon2
      const hashedPassword = await argon2.hash(createUserDto.password);

      const userProfile = this.userProfilesRepo.create({
        username: createUserDto.username,
        full_name: createUserDto.full_name,
        dob: createUserDto.dob,
        status: 'ACTIVE',
      });

      const savedUserProfile = await this.userProfilesRepo.save(userProfile);

      if (!savedUserProfile) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.EXPECTATION_FAILED,
          message: 'Failed to create user profile',
        };
      }

      // Step 2: Create the user authentication profile
      const userProfileAuth = this.userProfilesAuthRepo.create({
        email: createUserDto.email,
        password: hashedPassword,
        jwt_token: '',
        token_status: 'ACTIVE',
        userProfile: savedUserProfile, // Use the saved user profile for the relationship
      });

      const savedUserProfileAuth =
        await this.userProfilesAuthRepo.save(userProfileAuth);

      if (savedUserProfileAuth) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.CREATED,
          message: 'User registered successfully',
          data: savedUserProfileAuth,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.EXPECTATION_FAILED,
          message: 'Failed to create user authentication profile',
        };
      }
    } catch (err) {
      console.error('Error in registerUser:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'An error occurred during registration',
        data: [],
      };
    }
  }
  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      // Check if user exists by email
      const userAuth = await this.userProfilesAuthRepo.findOne({
        where: { email },
      });

      if (!userAuth) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.BAD_REQUEST,
          message: 'Invalid Email',
        };
      }

      // Verify the password
      const isPasswordValid = await argon2.verify(userAuth.password, password);

      if (!isPasswordValid) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.BAD_REQUEST,
          message: 'Invalid Password',
        };
      }

      // Generate JWT token (you can use your own secret key and expiration settings)
      const jwtToken = this.jwtService.sign(
        { id: userAuth.id, email: userAuth.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      // Update the user's token and status in the database
      userAuth.jwt_token = jwtToken;
      userAuth.token_status = 'ACTIVE';
      await this.userProfilesAuthRepo.save(userAuth);

      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          token: jwtToken,
          user: {
            username: userAuth.userProfile?.username,
            email: userAuth.email,
            full_name: userAuth.userProfile?.full_name,
          },
        },
      };
    } catch (err) {
      console.error('Error in loginUser:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'An error occurred during login',
        data: [],
      };
    }
  }
}
