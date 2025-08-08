import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployersService {
  constructor(@InjectRepository(Employer) private readonly employerRepo: Repository<Employer>) { }

  async create(createEmployerDto: CreateEmployerDto) {
    const employer = await this.findByRelation(createEmployerDto.userId, createEmployerDto.companyId)
    if (employer) {
      throw new ConflictException('Employer already exists');
    }
    return {
      message: "Employer created successfully!",
      employer: await this.employerRepo.save(createEmployerDto),
      status: 200
    };
  }

  async findAll() {
    const employers = await this.employerRepo.find({ relations: ['user'] });
    return {
      employers: employers,
      status: 200
    };
  }

  async findOne(id: number) {
    const employer = await this.employerRepo.findOne({
      where: { id },
      relations: ['user']
    });
    return {
      employer: employer,
      status: 200
    };
  }

  async update(id: number, updateEmployerDto: UpdateEmployerDto) {
    const employer = await this.findByRelation(updateEmployerDto.userId!, updateEmployerDto.companyId!)
    if (employer?.id !== id) {
      throw new ConflictException('Employer already exists');
    }
    return {
      message: "Employer updated successfully!",
      id: await this.employerRepo.update(id, updateEmployerDto),
      status: 200
    };
  }

  async remove(id: number) {
    const employer = await this.findOne(id);
    if (!employer) {
      throw new NotFoundException("Employer not found");
    }
    await this.employerRepo.delete(id);
    return {
      message: "Employer deleted successfully!",
      status: 200
    };
  }

  async findByRelation(userId: number, companyId: number) {
    return this.employerRepo.findOne({ where: { userId, companyId } });
  }

}