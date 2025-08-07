import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('edu')
export class Edu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inst_name: string;

  @Column()
  faculty: string;

  @Column()
  dagree: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ default: false })
  is_current: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  job_seeker_id: number;
}
