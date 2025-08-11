import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer"
import { MailService } from "../mail/mail.service"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailerService: MailService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userFoundByEmail = await this.findByEmail(createUserDto.email)
    if (!userFoundByEmail) {
      const userFoundByPhone = await this.findByPhone(createUserDto.phone)
      if (!userFoundByPhone) {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 7);
        try {
          await this.mailerService.sendOtp(createUserDto.email, "signup");
          return {
            data: await this.userRepo.save({ ...createUserDto, password: hashedPassword }),
            message: "User created successfully!, please check your email for OTP",
            success: true
          };
        } catch (error) {
          throw new BadRequestException("Failed to send welcome email: " + error);
        }
      }
      throw new ConflictException("There is a user with this phone.")
    }
    throw new ConflictException("There is a user with this email.")
  }

  async findAll() {
    const users = await this.userRepo.find()
    if (!users) {
      return {
        message: "Users not found",
        success: false
      }
    }
    return {
      message: "Users retrieved successfully",
      data: users,
      success: true
    };
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ["employers", "jobSeekers"]
    });
    if (!user) {
      return {
        message: "User not found",
        success: false
      }
    }
    return {
      message: "User retrieved successfully",
      data: user,
      success: true
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 7);
      updateUserDto.password = hashedPassword;
    }
    const updated=await this.userRepo.preload({id, ...updateUserDto});
    if (!updated) {      
      return{
        message:"User not found",
        success:false
      }
    }
    return {
      message: "User updated succesfully! ",
      data:await this.userRepo.save(updated),
      success: true
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
   const deleted= await this.userRepo.delete({id});
    if (!deleted.affected) {
      return {
        message: "User not found",
        success: false
      }
    }
    return {
      message: "User deleted successfully! ",
      data:{affected: deleted.affected},
      success: true,
    }
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({ email })
  }

  async findByPhone(phone: string) {
    return this.userRepo.findOneBy({ phone })
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const user = await this.findOne(id);
    if (!user?.data) {
      throw new NotFoundException("User not found");
    }
    return this.userRepo.update(id, { refreshToken });
  }

  deActivate(id: number) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.userRepo.update(id, { isActive: false });
  }

  async activate(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.userRepo.update({ id }, { isActive: true });
  }
}
