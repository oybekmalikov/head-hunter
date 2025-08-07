import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>
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
    return {
      message: "Companies retrieved successfully",
      data,
      success: true,
    };
  }

  async findOne(id: number) {
    const data = await this.companyRepo.findOne({ where: { id } });
    return {
      message: "Company retrieved successfully",
      data,
      success: true,
    };
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    await this.companyRepo.update(id, updateCompanyDto);
    const updated = await this.companyRepo.findOne({ where: { id } });
    return {
      message: "Company updated successfully",
      data: updated,
      success: true,
    };
  }

  async remove(id: number) {
    await this.companyRepo.delete(id);
    return {
      message: "Company removed successfully",
      success: true,
    };
  }
}
