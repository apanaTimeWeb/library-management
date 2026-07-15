import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Permission } from './/permission.entity';
import { User } from './/user.entity';

@Entity('roles')
export class Role extends BaseEntity {

  @Column({ unique: true })
  name: string; // e.g., 'SUPERADMIN', 'ADMIN', 'MANAGER', 'STAFF'

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({ name: 'role_permissions' })
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
