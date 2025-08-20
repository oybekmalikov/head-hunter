import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { CreateEmployerDto } from "./dto/create-employer.dto";
import { UpdateEmployerDto } from "./dto/update-employer.dto";
import { Employer } from "./entities/employer.entity";

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employer)
    private readonly employerRepo: Repository<Employer>,
    private readonly userService: UsersService,
  ) {}

  async create(createEmployerDto: CreateEmployerDto) {
    const employer = await this.findByRelation(
      createEmployerDto.userId,
      createEmployerDto.companyId,
    );
    if (employer) {
      throw new ConflictException("Employer already exists");
    }
    await this.userService.update(createEmployerDto.userId, {
      role: "employer",
    });
    return {
      message: "Employer created successfully!",
      employer: await this.employerRepo.save(createEmployerDto),
      status: 200,
    };
  }

  async findAll() {
    const data = await this.employerRepo.find({
      relations: ["user", "company"],
    })
    if (!data || data.length === 0) {
      return {
        message: "No employers found",
        success: false,
      };
    }
    return {
      message: "Employers retrieved successfully",
      data: data,
      success: true,
    };
  }

  async findAllByPagination(page: number, limit: number) {
    const [data, total] = await this.employerRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ["user", "company"],
    });
    if (!data || data.length === 0) {
      return {
        message: "No employers found",
        success: false,
      };
    }
    return {
      message: "Employers retrieved successfully",
      data: data,
      total: total,
      success: true,
    };
  }

  async findOne(id: number) {
    const employer = await this.employerRepo.findOne({
      where: { id },
      relations: ["user", "company"],
    });
    if (!employer) {
      return {
        message: "Employer not found",
        success: false,
      };
    }
    return {
      employer: employer,
      status: 200,
    };
  }

  async update(id: number, updateEmployerDto: UpdateEmployerDto) {
    const employer = await this.findByRelation(
      updateEmployerDto.userId!,
      updateEmployerDto.companyId!,
    );
    if (employer?.id !== id) {
      throw new ConflictException("Employer already exists");
    }
    const updated = await this.employerRepo.preload({
      id,
      ...updateEmployerDto,
    });
    if (!updated) {
      return {
        message: "Employer not found",
        success: false,
      };
    }
    return {
      message: "Employer updated successfully!",
      id: await this.employerRepo.save(updated),
      status: 200,
    };
  }

  async remove(id: number) {
    const employer = await this.findOne(id);
    if (!employer) {
      throw new NotFoundException("Employer not found");
    }
    const deleted = await this.employerRepo.delete({ id });
    if (deleted.affected === 0) {
      return {
        message: "Employer not found",
        data: null,
        success: false,
      };
    }
    return {
      message: "Employer deleted successfully!",
      data: { affected: deleted.affected },
      success: true,
    };
  }
  async findByRelation(userId: number, companyId: number) {
    return this.employerRepo.findOne({ where: { userId, companyId } });
  }
  async userProfile(id: number) {
    const user = await this.employerRepo.findOne({
      where: { id },
      relations: ["user", "company"],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return {
      message: "Employer profile retrieved successfully",
      data: user,
      success: true,
    };
  }
}
