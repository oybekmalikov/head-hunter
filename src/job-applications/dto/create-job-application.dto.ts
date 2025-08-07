import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateJobApplicationDto {
		@ApiProperty({
			example: 1,
			description:"The unique id of the job posting",
		})
		@IsNumber({},{message:"jobPostingId must be a number"})
		@IsNotEmpty({message:"jobPostingId is required"})
		jobPostingId: number;
	
		@ApiProperty({
			example: 1,
			description:"The unique id of the job seeker",
		})
		@IsNumber({},{message:"jobSeekerId must be a number"})
		@IsNotEmpty({message:"jobSeekerId is required"})
		jobSeekerId: number;
	
		@ApiProperty({
			example: "/",
			description:"The resume url of the job seeker",
		})
		@IsString({message:"resumeUrl must be a string"})
		@IsNotEmpty({message:"resumeUrl is required"})
		resumeUrl: string;
	
		@ApiProperty({
			example: "Cover Letter",
			description:"The cover letter url of the job seeker",
		})
		@IsString({message:"coverLetter must be a string"})
		@IsNotEmpty({message:"coverLetter is required"})
		coverLetter: string;
	
		@ApiProperty({
			example: "pending",
			description:"The status of the job application || pending, accepted, rejected",
		})
		@IsEnum(["pending", "accepted", "rejected"],{message:"status must be pending, accepted, rejected"})
		@IsNotEmpty({message:"status is required"})
		status: string;
}
