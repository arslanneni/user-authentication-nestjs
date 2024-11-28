import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfiles } from '../entities/users_profile.entity';

@Entity('user_profiles_auth')
export class UserProfilesAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserProfiles, (userProfile) => userProfile.auth, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountid' })
  userProfile: UserProfiles;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text' })
  jwt_token: string;

  @Column()
  token_status: string;

  @UpdateDateColumn()
  updated_at: Date;
}
