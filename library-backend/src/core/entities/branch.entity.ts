import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tenant } from './/tenant.entity';
import { User } from './/user.entity';

@Entity('branches')
export class Branch extends BaseEntity {
  @ManyToOne(() => Tenant, (tenant) => tenant.branches)
  tenant: Tenant;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.branch)
  users: User[];
}
