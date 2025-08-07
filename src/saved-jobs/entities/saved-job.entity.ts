import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "saved_jobs" })
export class SavedJob {
	@ApiProperty({ example: 1, description: "The unique id of the saved job" })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: 1, description: "The unique id of the job posting" })
	@Column()
	jobPostingId: number;

	@ApiProperty({ example: 1, description: "The unique id of the job seeker" })
	@Column()
	jobSeekerId: number;

	// @ManyToOne((type) => JobPosting)
	// @JoinColumn({ name: "jobPostingId", referencedColumnName: "id" })
	// jobPosting: JobPosting;

	// @ManyToOne(() => JobSeeker)
	// @JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
	// jobSeeker: JobSeeker;
}
