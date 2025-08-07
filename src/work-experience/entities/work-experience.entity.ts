import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "work_experience" })
export class WorkExperience {
	@ApiProperty({ example: 1, description: "The unique id of the work experience" })
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({ example: 1, description: "The unique id of the job posting" })
	@Column()
	jobSeekerId: number

	@ApiProperty({ example: "Google", description: "The company name" })
	@Column({ length: 100 })
	companyName: string

	@ApiProperty({ example: "Software Engineer", description: "The position" })
	@Column({ length: 100 })
	position: string

	@ApiProperty({ example: "2020-01-01", description: "The start date" })
	@Column({ length: 20 })
	startDate: string

	@ApiProperty({ example: "2020-01-01", description: "The end date" })
	@Column({ length: 20, nullable: true })
	endDate: string

	@ApiProperty({ example: true, description: "Is the job seeker currently working here" })
	@Column()
	isCurrent: boolean

	@ApiProperty({ example: "Description", description: "The description" })
	@Column({ length: 255,nullable: true })
	description: string

	// @ManyToOne(() => JobSeeker)
	// @JoinColumn({ name: "jobSeekerId", referencedColumnName: "id" })
	// jobSeeker: JobSeeker;
}
