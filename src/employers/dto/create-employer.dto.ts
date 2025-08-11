import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";

export class CreateEmployerDto {
    @ApiProperty({
        example: 1,
        description: 'This is the user ID number.'
    })
    @IsNotEmpty({ message: 'User ID is required' })
    @IsNumber({}, { message: 'User ID must be a number' })
    userId: number;

    @ApiProperty({
        example: 1,
        description: 'This is the company ID number.'
    })
    @IsNotEmpty({ message: 'Company ID is required' })
    @IsNumber({}, { message: 'Company ID must be a number' })   
    companyId: number;

    @ApiProperty({
        example: 'Product manager',
        description: 'This is the employer position.'
    })
    @IsNotEmpty({ message: 'Position is required' })
    @IsString({ message: 'Position must be a string' })
    position: string;

    @ApiProperty({
        example: 'IT department',
        description: 'This is the employer department.'
    })
    @IsNotEmpty({ message: 'Department is required' })
    @IsString({ message: 'Department must be a string' })
    department: string;
}
