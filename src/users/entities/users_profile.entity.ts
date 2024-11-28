import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfilesAuth } from '../entities/users_profiles_auth.entity';

@Entity('user_profiles')
export class UserProfiles {
  @PrimaryGeneratedColumn()
  accountid: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  dob: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  status: string;

  @OneToOne(() => UserProfilesAuth, (auth) => auth.userProfile)
  auth: UserProfilesAuth;
}
