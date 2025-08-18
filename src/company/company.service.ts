import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepo.create(createCompanyDto);
    await this.companyRepo.save(company);
    return {
      message: "Company created successfully",
      data: company,
      success: true,
    };
  }
  async findAll() {
    const data = await this.companyRepo.find();
    if (!data || data.length == 0) {
      return {
        message: "Companies not found.",
        success: false,
      };
    }
    return {
      message: "Companies retrieved successfully",
      data,
      success: true,
    };
  }
  async findOne(id: number) {
    const data = await this.companyRepo.findOne({ where: { id } });
    if (!data) {
      return {
        message: "Company not found",
        success: false,
      };
    }
    return {
      message: "Company retrieved successfully",
      data,
      success: true,
    };
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const updated = await this.companyRepo.preload({ id, ...updateCompanyDto });
    if (!updated) {
      return {
        message: "Company not found",
        success: false,
      };
    }
    return {
      message: "Company updated successfully",
      data: updated,
      success: true,
    };
  }

  async remove(id: number) {
    const deleted = await this.companyRepo.delete({ id });
    if (!deleted.affected) {
      return {
        message: "Company not found",
        success: false,
      };
    }
    return {
      message: "Company removed successfully",
      data: { affacted: deleted.affected },
      success: true,
    };
  }

  async getCompanyByName(name: string) {
    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);
    const company = await this.companyRepo
      .createQueryBuilder("company")
      .where("company.name LIKE :name", { name: `%${nameFormatted}%` })
      .getOne();
    if (!company) {
      return {
        message: "Company not found",
        success: false,
      };
    }
    return {
      message: "Company retrieved successfully",
      data: company,
      success: true,
    };
  }
}
