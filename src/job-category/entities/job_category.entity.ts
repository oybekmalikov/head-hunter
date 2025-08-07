import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'job_category' })
export class JobCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 55 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  is_active: boolean;
}
