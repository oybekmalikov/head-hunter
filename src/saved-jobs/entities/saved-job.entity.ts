import { JobSeekerPosting } from '../../job-seeker-posting/entities/job-seeker-posting.entity';
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity"

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

	@ManyToOne((type) => JobSeekerPosting)
	@JoinColumn({ name: "jobPostingId", referencedColumnName: "id" })
	jobPosting: JobSeekerPosting;

	@ManyToOne(() => JobSeeker)
	@JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
	jobSeeker: JobSeeker;
}
