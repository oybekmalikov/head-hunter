import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Edu } from "../../edu/entities/edu.entity";
import { JobApplication } from "../../job-applications/entities/job-application.entity";
import { JobSeekerPosting } from "../../job-seeker-posting/entities/job-seeker-posting.entity";
import { JobSeekerSkill } from "../../job-seeker-skills/entities/job-seeker-skill.entity";
import { JobsNotification } from "../../jobs-notifications/entities/jobs-notification.entity";
import { SavedJob } from "../../saved-jobs/entities/saved-job.entity";
import { User } from "../../users/entities/user.entity";
import { WorkExperience } from "../../work-experience/entities/work-experience.entity";

@Entity({ name: "job-seekers" })
export class JobSeeker {
  @ApiProperty({
    example: 1,
    description: "This is the job seeker ID number.",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "This is the user ID number.",
  })
  @Column()
  userId: number;

  @ApiProperty({
    example: "Ali",
    description: "This is the job seeker's birth date",
  })
  @Column({nullable:false})
  dateOdBirth: string;

  // @ApiProperty({
  //   example: "Ali",
  //   description: "This is the job seeker's first name",
  // })
  // firstName: string;

  // @ApiProperty({
  //   example: "Aliyev",
  //   description: "This is the job seeker's last name",
  // })
  // lastName: string;

  @ApiProperty({
    example: "male",
    description: "This is the job seeker's gender",
  })
  @Column()
  gender: string;

  @ApiProperty({
    example: "Mirzo Ulug'bek 2/2",
    description: "This job seeker's address",
  })
  @Column()
  address: string;

  @ApiProperty({
    example: "Tashkent",
    description: "This is the job seeker's city",
  })
  @Column()
  city: string;

  @ApiProperty({
    example: "https://github.com/aliyevAli",
    description: "This is the job seeker's github url",
  })
  @Column()
  githubUrl: string;

  @ApiProperty({
    example: "https://www.linkedin.com/in/aliyevAli",
    description: "This is the job seeker's linkedin url",
  })
  @Column()
  linkedIn: string;

  @ApiProperty({
    example: "https://www.resume.com/aliyevAli",
    description: "This is the job seeker's resume url",
  })
  @Column()
  resumeUrl: string;

  @ApiProperty({
    example: "QWERTY",
    description: "This is the job seeker's summary",
  })
  @Column()
  summary: string;

  @ApiProperty({
    example: 5000000,
    description: "This is the job seeker's average salary",
  })
  @Column()
  avgSalary: number;

  @ApiProperty({
    example: true,
    description: "This is the job seeker's is open to work",
  })
  @Column()
  isOpenToWork: boolean;

  @ApiProperty({
    example: 1,
    description: "This is the job seeker's experience",
  })
  @Column()
  experience: number;

  // Relations
  @ManyToOne(() => User, (user) => user.jobSeekers)
  user: User;

  @OneToMany(() => JobApplication, (application) => application.jobSeeker)
  applications: JobApplication[];

  @OneToMany(() => Edu, (edu) => edu.jobSeeker)
  education: Edu[];

  @OneToMany(() => WorkExperience, (workExp) => workExp.jobSeeker)
  workExperience: WorkExperience[];

  @OneToMany(() => SavedJob, (savedJob) => savedJob.jobSeeker)
  savedJobs: SavedJob[];

  @OneToMany(() => JobSeekerSkill, (skill) => skill.jobSeeker)
  skills: JobSeekerSkill[];

  @OneToMany(() => JobsNotification, (notification) => notification.jobSeeker)
  notifications: JobsNotification[];

  @OneToMany(() => JobSeekerPosting, (posting) => posting.jobSeeker)
  postings: JobSeekerPosting[];
}
