import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateJobSeekerDto {
    @ApiProperty({
        example: 1,
        description: 'This is the user ID number.'
    })
    @IsNotEmpty({ message: 'User ID is required' })
    @IsNumber({}, { message: 'User ID must be a number' })
    userId: number;

    @ApiProperty({
        example: "Ali",
        description: "This is the job seeker's birth date"
    })
    @IsNotEmpty({ message: 'Date of birth is required' })
    dateOdBirth: string;

    @ApiProperty({
        example: "Ali",
        description: "This is the job seeker's first name"
    })
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @ApiProperty({
        example: "Aliyev",
        description: "This is the job seeker's last name"
    })
    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @ApiProperty({
        example: "male",
        description: "This is the job seeker's gender"
    })
    @IsNotEmpty({ message: 'Gender is required' })
    gender: string;

    @ApiProperty({
        example: "Mirzo Ulug'bek 2/2",
        description: "This job seeker's address"
    })
    @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @ApiProperty({
        example: "Tashkent",
        description: "This is the job seeker's city"
    })
    @IsNotEmpty({ message: 'City is required' })
    city: string;

    @ApiProperty({
        example: "https://github.com/aliyevAli",
        description: "This is the job seeker's github url"
    })
    @IsNotEmpty({ message: 'Github url is required' })
    githubUrl: string;

    @ApiProperty({
        example: "https://www.linkedin.com/in/aliyevAli",
        description: "This is the job seeker's linkedin url"
    })
    @IsNotEmpty({ message: 'Linkedin url is required' })
    linkedIn: string;

    @ApiProperty({
        example: "https://www.resume.com/aliyevAli",
        description: "This is the job seeker's resume url"
    })
    @IsNotEmpty({ message: 'Resume url is required' })
    resumeUrl: string;

    @ApiProperty({
        example: "QWERTY",
        description: "This is the job seeker's summary"
    })
    @IsNotEmpty({ message: 'Summary is required' })
    summary: string;

    @ApiProperty({
        example: 5000000,
        description: "This is the job seeker's average salary"
    })
    @IsNotEmpty({ message: 'Average salary is required' })
    avgSalary: number;

    @ApiProperty({
        example: true,
        description: "This is the job seeker's is open to work"
    })
    @IsNotEmpty({ message: 'Is open to work is required' })
    isOpenToWork: boolean;

    @ApiProperty({
        example: "1 year",
        description: "This is the job seeker's experience"
    })
    @IsNotEmpty({ message: 'Experience is required' })
    experience: number;
}
