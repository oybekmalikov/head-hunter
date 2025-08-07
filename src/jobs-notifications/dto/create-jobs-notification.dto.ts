import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateJobsNotificationDto {
	@ApiProperty({
			example: 1,
			description: "The unique id of the job posting",
		})
		@IsNotEmpty({message:"jobPostingId is required"})
		@IsNumber({},{message:"jobPostingId must be a number"})
		jobPostingId: number;
	
		@ApiProperty({
			example: 1,
			description: "The unique id of the job seeker",
		})
		@IsNotEmpty({message:"jobSeekerId is required"})
		@IsNumber({},{message:"jobSeekerId must be a number"})
		jobSeekerId: number;
	
		@ApiProperty({
			example: "Job title",
			description: "The job title",
		})
		@IsNotEmpty({message:"title is required"})
		@IsString({message:"title must be a string"})
		@MaxLength(100,{message:"title must be at most 100 characters"})
		title: string;
	
		@ApiProperty({
			example: "Job content",
			description: "The job content",
		})
		@IsString({message:"content must be a string"})
		@MaxLength(255,{message:"content must be at most 1000 characters"})
		content:string
	
		@ApiProperty({
			example: false,
			description: "Notification is wiewed or not",
		})
		@IsBoolean({message:"isWiewed must be a boolean"})
		isWiewed: boolean
}
