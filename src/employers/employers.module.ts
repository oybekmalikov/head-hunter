import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employer]), UsersModule],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService]
})
export class EmployersModule {}
