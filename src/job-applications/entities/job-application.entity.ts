import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";
import { Chat } from "../../chat/entities/chat.entity";

@Entity({name: "job_applications"})
export class JobApplication {
	@ApiProperty({
		example: 1,
		description:"The unique id of the job application",
	})
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({
		example: 1,
		description:"The unique id of the job posting",
	})
	@Column()
	jobPostingId: number;

	@ApiProperty({
		example: 1,
		description:"The unique id of the job seeker",
	})
	@Column()
	jobSeekerId: number;

	@ApiProperty({
		example: "/",
		description:"The resume url of the job seeker",
	})
	@Column({length: 255,nullable: true})
	resumeUrl: string;

	@ApiProperty({
		example: "Cover Letter",
		description:"The cover letter url of the job seeker",
	})
	@Column({length: 255,nullable: true})
	coverLetter: string;

	@ApiProperty({
		example: "pending",
		description:"The status of the job application || pending, accepted, rejected",
	})
	@Column({enum: ['pending', 'accepted', 'rejected'], default: 'pending'})
	status: string;

	// @ManyToOne(type => JobPosting)
	// @JoinColumn({name: 'jobPostingId', referencedColumnName: 'id'})
	// jobPosting: JobPosting;

	@ManyToOne(type => JobSeeker)
	@JoinColumn({name: 'jobSeekerId', referencedColumnName: 'id'})
	jobSeeker: JobSeeker;
	
	@OneToMany(type => Chat, chat => chat.jobApplicationId)
	@JoinColumn({name: 'jobApplicationId', referencedColumnName: 'id'})
	chats: Chat[]
}
