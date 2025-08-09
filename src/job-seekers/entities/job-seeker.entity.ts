import { ApiProperty } from "@nestjs/swagger";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity({name: "job_seekers"})
export class JobSeeker {

    @ApiProperty({
        example: 1,
        description: 'This is the job seeker ID number.'
    })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        example: 1,
        description: 'This is the user ID number.'
    })
    userId: number;

    @ApiProperty({
        example: "Ali",
        description: "This is the job seeker's birth date"
    })
    dateOdBirth: string;

    @ApiProperty({
        example: "Ali",
        description: "This is the job seeker's first name"
    })
    firstName: string;

    @ApiProperty({
        example: "Aliyev",
        description: "This is the job seeker's last name"
    })
    lastName: string;

    @ApiProperty({
        example: "male",
        description: "This is the job seeker's gender"
    })
    gender: string;

    @ApiProperty({
        example: "Mirzo Ulug'bek 2/2",
        description: "This job seeker's address"
    })
    address: string;

    @ApiProperty({
        example: "Tashkent",
        description: "This is the job seeker's city"
    })
    city: string;

    @ApiProperty({
        example: "https://github.com/aliyevAli",
        description: "This is the job seeker's github url"
    })
    githubUrl: string;

    @ApiProperty({
        example: "https://www.linkedin.com/in/aliyevAli",
        description: "This is the job seeker's linkedin url"
    })
    linkedIn: string;

    @ApiProperty({
        example: "https://www.resume.com/aliyevAli",
        description: "This is the job seeker's resume url"
    })
    resumeUrl: string;

    @ApiProperty({
        example: "QWERTY",
        description: "This is the job seeker's summary"
    })
    summary: string;

    @ApiProperty({
        example: 5000000,
        description: "This is the job seeker's average salary"
    })
    avgSalary: number;

    @ApiProperty({
        example: true,
        description: "This is the job seeker's is open to work"
    })
    isOpenToWork: boolean;

    @ApiProperty({
        example: 1,
        description: "This is the job seeker's experience"
    })
    experience: number;

    @ManyToOne(() => User, (user) => user.jobSeekers)
    user: User
}
