import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator"
import { Column } from "typeorm"

export class CreateWorkExperienceDto {
	@ApiProperty({ example: 1, description: "The unique id of the job posting" })
	@IsNotEmpty({ message: "jobSeekerId is required" })
	@IsNumber({}, { message: "jobSeekerId must be a number" })
	jobSeekerId: number

	@ApiProperty({ example: "Google", description: "The company name" })
	@IsNotEmpty({ message: "companyName is required" })
	@IsString({ message: "companyName must be a string", })
	@MinLength(5, { message: "companyName must be at least 5 characters" })
	@MaxLength(100, { message: "companyName must be at most 100 characters" })
	companyName: string

	@ApiProperty({ example: "Software Engineer", description: "The position" })
	@IsNotEmpty({ message: "position is required" })
	@IsString({ message: "position must be a string", })
	@MinLength(5, { message: "position must be at least 5 characters" })
	@MaxLength(100, { message: "position must be at most 100 characters" })
	position: string

	@ApiProperty({ example: "2020-01-01", description: "The start date" })
	@IsNotEmpty({ message: "startDate is required" })
	@IsDateString({}, { message: "startDate must be a valid date" })
	startDate: string

	@ApiProperty({ example: "2020-01-01", description: "The end date" })
	@IsDateString({}, { message: "endDate must be a valid date" })
	endDate: string

	@ApiProperty({ example: true, description: "Is the job seeker currently working here" })
	@IsBoolean({ message: "isCurrent must be a boolean" })
	isCurrent: boolean

	@ApiProperty({ example: "Description", description: "The description" })
	@IsString({ message: "description must be a string", })
	@MaxLength(255, { message: "description must be at most 255 characters" })
	description: string
}
