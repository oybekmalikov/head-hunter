import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userFoundByEmail = await this.findByEmail(createUserDto.email)
    if (!userFoundByEmail) {
      const userFoundByPhone = await this.findByPhone(createUserDto.phone!)
      if (!userFoundByPhone) {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 7);
        return {
          user: await this.userRepo.save({ ...createUserDto, password: hashedPassword }),
          message: "User created successfully!",
          status: 201
        };
      }
      throw new ConflictException("There is a user with this phone.")
    }
    throw new ConflictException("There is a user with this email.")
  }

  async findAll() {
    const users = await this.userRepo.find({relations: ["employers", "jobSeekers"]});
    if (!users) {
      return {
        message: "Users not found",
        users: [],
        success: false
      }
    }
    return {
      users: users,
      status: 200
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
        user: null,
        success: false
      }
    }
    return {
      user: user,
      status: 200
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
    await this.userRepo.update(id, updateUserDto);
    return {
      message: "User updated succesfully! ",
      status: 200,
      success: true
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.userRepo.delete(id);
    return {
      message: "User deleted successfully! ",
      status: 200
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
    if (!user.user) {
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
