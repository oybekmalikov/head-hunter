import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employer } from "../../employers/entities/employer.entity";
import { JobPosting } from "../../job-postings/entities/job-posting.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("companies")
export class Company {
  @ApiProperty({
    description: "Unique identifier for the company",
    example: 1,
  })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({
    description: "Name of the company",
    example: "Tech Innovations Inc.",
  })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({
    description: "Brief description of the company",
    example: "A leading company in tech innovations.",
  })
  @Column({ length: 255 })
  description: string;

  @ApiProperty({
    description: "Industry in which the company operates",
    example: "Technology",
  })
  @Column()
  industry: string;

  @ApiProperty({
    description: "Size of the company",
    example: "51-200 employees",
  })
  @Column()
  companySize: string;

  @ApiProperty({
    description: "Website URL of the company",
    example: "https://www.techinnovations.com",
  })
  @Column()
  webSiteUrl: string;

  @ApiProperty({
    description: "Logo URL of the company",
    example: "https://www.techinnovations.com/logo.png",
  })
  @Column()
  logoUrl: string;

  @ApiProperty({
    description: "Year in which the company was established",
    example: 2015,
  })
  @Column()
  establishedYear: number;

  @ApiProperty({
    description: "Address of the company",
    example: "123 Tech Lane, Silicon Valley, CA",
  })
  @Column()
  address: string;

  @ApiProperty({
    description: "Contact number for the company",
    example: "+1-234-567-8900",
  })
  @Column()
  callNumber: string;

  @ApiProperty({
    description: "Email address for the company",
    example: "info@techinnovations",
  })
  @Column()
  email: string;

  @ApiProperty({
    description: "Indicates if the company is verified",
    example: true,
  })
  @Column({ default: false })
  isVerified: boolean;

  // Relations
  @OneToMany(() => Employer, (employer) => employer.company)
  employers: Employer[];

  @OneToMany(() => JobPosting, (jobPosting) => jobPosting.company)
  jobPostings: JobPosting[];
}
