import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Company } from "../../company/entities/company.entity";

@Entity({ name: "employers" })
export class Employer {
    @ApiProperty({
        example: 1,
        description: 'This is the user ID number.'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 1,
        description: "This is the user's id number"
    })
    @Column()
    userId: number;

    @ApiProperty({
        example: 1,
        description: "This is the company's id number"
    })
    @Column()
    companyId: number;

    @ApiProperty({
        example: "product manager",
        description: "This is the employer's position"
    })
    @Column()
    position: string;

    @ApiProperty({
        example: "IT department",
        description: "This is the employer's department"
    })
    @Column()
    department: string;

    @ManyToOne(() => User, (user) => user.employers)
    user: User

    @ManyToOne(() => Company, (company) => company.employers)
    company: Company
}