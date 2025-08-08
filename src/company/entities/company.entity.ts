import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  // Relations will be added once corresponding modules are finalized
}
