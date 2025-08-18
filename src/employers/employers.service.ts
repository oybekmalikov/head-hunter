import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "../notifications/entities/notification.entity";
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
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async create(createEmployerDto: CreateEmployerDto) {
    const isEmployer = await this.findByRelation(
      createEmployerDto.userId,
      createEmployerDto.companyId,
    );
    if (isEmployer) {
      throw new ConflictException("Employer already exists");
    }
    const employer = await this.employerRepo.save(createEmployerDto);
    const thisEmployer = await this.employerRepo.findOne({
      where: { id: employer.id },
      relations: ["user", "company"],
    });
    if (!thisEmployer) {
      throw new NotFoundException("Employer not found");
    }
    await this.userService.update(employer.userId, {
      role: "employer",
    });
    const user = await this.userService.findByRole("superadmin");
    await this.notificationRepo.save({
      title: "New employer created",
      message: `A new employer request for verification\n
      Employer name: ${thisEmployer.user.firstName} ${thisEmployer.user.lastName}\n
      Employer email: ${thisEmployer.user.email}\n
      Employer phone: ${thisEmployer.user.phone}\n
      Employer company: ${thisEmployer.company.name}\n
      Employer position: ${thisEmployer.position}\n
      Employer department: ${thisEmployer.department}\n
      
      To verify the employer, please <a href="${process.env.API_HOST}/employers/verify/${thisEmployer.id}" target="_blank" rel="noopener noreferrer">click here</a>.
      `,
      userId: user[0]?.id,
    });
    return {
      message: "Application sent successfully! Please wait for admin approval.",
      employer: thisEmployer,
      success: true,
    };
  }

  async findAll() {
    const employers = await this.employerRepo.find({
      relations: ["user", "company"],
    });
    if (!employers || employers.length === 0) {
      return {
        message: "No employers found",
        success: false,
      };
    }
    return {
      message: "Employers retrieved successfully",
      data: employers,
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
  async verifyEmployer(id: number) {
    const employer = await this.employerRepo.findOne({ where: { id } });
    if (!employer) {
      throw new NotFoundException("Employer not found");
    }
    employer.isVerifiedByAdmin = true;
    await this.notificationRepo.save({
      title: "Employer verified",
      message: "Your employer has been verified by admin",
      userId: employer.userId,
    });
    return await this.employerRepo.save(employer);
  }
  async unverifyEmployer(id: number) {
    const employer = await this.employerRepo.findOne({ where: { id } });
    if (!employer) {
      throw new NotFoundException("Employer not found");
    }
    employer.isVerifiedByAdmin = false;
    await this.notificationRepo.save({
      title: "Employer unverified",
      message: "Your employer has been unverified by admin",
      userId: employer.userId,
    });
    return await this.employerRepo.save(employer);
  }
}
