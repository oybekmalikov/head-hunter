import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "jobs_notifications" })
export class JobsNotification {
	@ApiProperty({
		example: 1,
		description: "The unique id of the job notification",
	})
	@PrimaryGeneratedColumn()
	id: number;
	@ApiProperty({
		example: 1,
		description: "The unique id of the job posting",
	})
	@Column()
	jobPostingId: number;

	@ApiProperty({
		example: 1,
		description: "The unique id of the job seeker",
	})
	@Column()
	jobSeekerId: number;

	@ApiProperty({
		example: "Job title",
		description: "The job title",
	})
	@Column({ length: 100 })
	title: string;

	@ApiProperty({
		example: "Job description",
		description: "The job description",
	})
	@Column({ length: 255 })
	content: string;

	@ApiProperty({
		example: false,
		description: "Notification is wiewed or not",
	})
	@Column({ default: false })
	isWiewed: boolean;

	@ManyToOne((type) => JobPosting)
	@JoinColumn({ name: "jobPostingId", referencedColumnName: "id" })
	jobPosting: JobPosting;

	@ManyToOne(() => JobSeeker)
	@JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
	jobSeeker: JobSeeker;
}
