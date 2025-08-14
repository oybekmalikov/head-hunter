import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailerService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFoundByEmail = await this.findByEmail(createUserDto.email);
    if (!userFoundByEmail) {
      const userFoundByPhone = await this.findByPhone(createUserDto.phone);
      if (!userFoundByPhone) {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 7);
        try {
          await this.mailerService.sendOtp(createUserDto.email, "signup");
          return {
            data: await this.userRepo.save({
              ...createUserDto,
              password: hashedPassword,
            }),
            message:
              "User created successfully!, please check your email for OTP",
            success: true,
          };
        } catch (error) {
          throw new BadRequestException(
            "Failed to send welcome email: " + error,
          );
        }
      }
      throw new ConflictException("There is a user with this phone.");
    }
    throw new ConflictException("There is a user with this email.");
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const userFoundByEmail = await this.findByEmail(createUserDto.email);
    if (!userFoundByEmail) {
      const userFoundByPhone = await this.findByPhone(createUserDto.phone);
      if (!userFoundByPhone) {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 7);
        return {
          data: await this.userRepo.save({
            ...createUserDto,
            password: hashedPassword,
            role: "admin",
          }),
          message: "Admin created successfully!",
          success: true,
        };
      }
      throw new ConflictException("There is a user with this phone.");
    }
    throw new ConflictException("There is a user with this email.");
  }

  async findAll() {
    const users = await this.userRepo.find();
    if (!users) {
      return {
        message: "Users not found",
        success: false,
      };
    }
    return {
      message: "Users retrieved successfully",
      data: users,
      success: true,
    };
  }

  async findAllByPagination(page: number, limit: number) {
    const [data, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: "ASC" },
      relations: ["employers", "jobSeekers"],
    });
    if (!data) {
      return {
        message: "Users not found",
        success: false,
      };
    }
    return {
      message: "Users retrieved successfully",
      data: data,
      total: total,
      success: true,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ["employers", "jobSeekers"],
    });
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }
    return {
      message: "User retrieved successfully",
      data: user,
      success: true,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (updateUserDto.password) {
      return {
        message: "Password cannot be updated",
        success: false,
      };
    }
    const updated = await this.userRepo.preload({ id, ...updateUserDto });
    if (!updated) {
      return {
        message: "User not found",
        success: false,
      };
    }
    return {
      message: "User updated succesfully! ",
      data: await this.userRepo.save(updated),
      success: true,
    };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const deleted = await this.userRepo.delete({ id });
    if (!deleted.affected) {
      return {
        message: "User not found",
        success: false,
      };
    }
    return {
      message: "User deleted successfully! ",
      data: { affected: deleted.affected },
      success: true,
    };
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async findByPhone(phone: string) {
    return this.userRepo.findOneBy({ phone });
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

  async updatePassword(id: number, password: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    await this.userRepo.update({ id }, { password: hashedPassword });
    return {
      message: "Password updated successfully!",
      success: true,
    };
  }
}
