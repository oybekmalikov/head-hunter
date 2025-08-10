import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobSeeker } from "../../job-seekers/entities/job-seeker.entity";

@Entity("educations")
export class Edu {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "National University of Uzbekistan",
    description: "Universitys name",
  })
  @Column()
  universityName: string;

  @ApiProperty({
    example: "Faculty of Biology",
    description: "Faculty name",
  })
  @Column()
  faculty: string;

  @ApiProperty({
    example: "Bachalour degree",
    description: "Diplom degree",
  })
  @Column()
  dagree: string;

  @ApiProperty({
    example: "2025-09-01",
    description: "Start date",
  })
  @Column()
  startDate: string;

  @ApiProperty({
    example: "2029-09-01",
    description: "End date",
  })
  @Column({ nullable: true })
  endDate: string;

  @ApiProperty({
    example: true,
    description: "Job seeker still studying at there",
  })
  @Column({ default: false })
  isCurrent: boolean;

  @ApiProperty({
    example: "Any description or note",
    description: "Any description or note",
  })
  @Column({ nullable: true })
  description: string;
  @ApiProperty({
    example: 1,
    description: "Job seeker's id",
  })
  @Column()
  jobSeekerId: number;

  // Relations
  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.education)
  @JoinColumn({ name: "jobSeekerId" })
  jobSeeker: JobSeeker;
}
