import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsIn,
  Min,
  Max,
  IsOptional,
} from "class-validator";

export class CreateJobPostingDto {
  @ApiProperty({
    example: 1,
    description: "ID of the employer who is posting the job",
  })
  @IsNotEmpty({ message: "employerId is required" })
  @IsNumber({}, { message: "employerId must be a number" })
  employerId: number;

  @ApiProperty({
    example: 2,
    description: "ID of the job category",
  })
  @IsNotEmpty({ message: "categoryId is required" })
  @IsNumber({}, { message: "categoryId must be a number" })
  categoryId: number;

  @ApiProperty({
    example: 3,
    description: "Company ID related to the job",
  })
  @IsNotEmpty({ message: "cmpId is required" })
  @IsNumber({}, { message: "cmpId must be a number" })
  companyId: number;

  @ApiProperty({
    example: "Senior Full Stack Developer",
    description: "Title of the job position",
  })
  @IsNotEmpty({ message: "title is required" })
  @IsString({ message: "title must be a string" })
  title: string;

  @ApiProperty({
    example: "Responsible for building and maintaining web applications.",
    description: "Detailed description of the job",
  })
  @IsNotEmpty({ message: "description is required" })
  @IsString({ message: "description must be a string" })
  description: string;

  @ApiProperty({
    example: "Bachelor's degree, 3+ years experience",
    description: "Job requirements",
  })
  @IsNotEmpty({ message: "requirements is required" })
  @IsString({ message: "requirements must be a string" })
  requirements: string;

  @ApiProperty({
    example: "React, Node.js, PostgreSQL",
    description: "Skills required for the job",
  })
  @IsNotEmpty({ message: "required_skills is required" })
  @IsString({ message: "required_skills must be a string" })
  requiredSkills: string;

  @ApiProperty({
    example: "full-time",
    description: "Type of job (e.g., full-time, part-time)",
  })
  @IsNotEmpty({ message: "job_type is required" })
  @IsString({ message: "job_type must be a string" })
  @IsIn(["full-time", "part-time", "contract", "internship"], {
    message:
      "job_type must be one of: full-time, part-time, contract, internship",
  })
  jobType: string;

  @ApiProperty({
    example: "remote",
    description: "Work location type (e.g., remote, onsite, hybrid)",
  })
  @IsNotEmpty({ message: "work_loc is required" })
  @IsString({ message: "work_loc must be a string" })
  @IsIn(["remote", "onsite", "hybrid"], {
    message: "work_loc must be one of: remote, onsite, hybrid",
  })
  workLocation: string;

  @ApiProperty({
    example: "Tashkent",
    description: "Location or city of the job",
  })
  @IsNotEmpty({ message: "location is required" })
  @IsString({ message: "location must be a string" })
  location: string;

  @ApiProperty({
    example: 3000,
    description: "Minimum salary for the position",
  })
  @IsNotEmpty({ message: "salary_min is required" })
  @IsNumber({}, { message: "salary_min must be a number" })
  @Min(0, { message: "salary_min cannot be negative" })
  salaryMin: number;

  @ApiProperty({
    example: 5000,
    description: "Maximum salary for the position",
  })
  @IsNotEmpty({ message: "salary_max is required" })
  @IsNumber({}, { message: "salary_max must be a number" })
  @Min(0, { message: "salary_max cannot be negative" })
  salaryMax: number;

  @ApiProperty({
    example: 3,
    description: "Required years of experience",
  })
  @IsNotEmpty({ message: "required_experience is required" })
  @IsNumber({}, { message: "required_experience must be a number" })
  @Min(0, { message: "required_experience cannot be negative" })
  requiredExperience: number;

  @ApiProperty({
    example: "monthly",
    description: "Salary payment period (e.g., monthly, yearly)",
  })
  @IsNotEmpty({ message: "salary_period is required" })
  @IsString({ message: "salary_period must be a string" })
  @IsIn(["monthly", "yearly", "weekly"], {
    message: "salary_period must be one of: monthly, yearly, weekly",
  })
  salaryPeriod: string;

  @ApiProperty({
    example: "senior",
    description: "Experience level required (e.g., junior, senior)",
  })
  @IsNotEmpty({ message: "experience_level is required" })
  @IsString({ message: "experience_level must be a string" })
  @IsIn(["intern", "junior", "mid", "senior", "lead"], {
    message:
      "experience_level must be one of: intern, junior, mid, senior, lead",
  })
  experienceLevel: string;

  @ApiProperty({
    example: "bachelor",
    description: "Required education level for the job",
  })
  @IsNotEmpty({ message: "education_level is required" })
  @IsString({ message: "education_level must be a string" })
  @IsIn(["high_school", "bachelor", "master", "phd"], {
    message:
      "education_level must be one of: high_school, bachelor, master, phd",
  })
  educationLevel: string;

  @ApiProperty({
    example: "2025-09-01T23:59:59Z",
    description: "Deadline for job application",
  })
  @IsNotEmpty({ message: "application_deadline is required" })
  @IsDateString(
    {},
    { message: "application_deadline must be a valid ISO date string" },
  )
  applicationDeadline: Date;

  @ApiProperty({
    example: "active",
    description: "Status of the job post",
  })
  @IsNotEmpty({ message: "status is required" })
  @IsString({ message: "status must be a string" })
  @IsIn(["active", "closed", "draft"], {
    message: "status must be one of: active, closed, draft",
  })
  status: string;
}
