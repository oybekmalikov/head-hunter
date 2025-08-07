import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { JobPosting } from "src/job-posting/entities/job-posting.entity";
import { Employers } from "src/employers/entities/employers.entity";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  industry: string;

  @Column()
  cmp_size: string;

  @Column()
  web_site_url: string;

  @Column()
  logo_url: string;

  @Column()
  established_year: number;

  @Column()
  address: string;

  @Column()
  call_number: string;

  @Column()
  email: string;

  @Column({ default: false })
  is_verified: boolean;

  @OneToMany(() => JobPosting, (jobPosting) => jobPosting.company)
  jobPostings: JobPosting[];

  @OneToMany(() => Employers, (employers) => employers.company)
  employers: Employers[];
}
