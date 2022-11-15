import { RegisterPayload } from '../../modules/auth';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { Hash } from '../../utils/Hash';
import { UserStatus } from './common/user.enum';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column({ length: 255 })
  fullName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  phoneNumber: string;

  @Column({
    name: `password`,
    length: 255,
  })
  password: string;

  @Column()
  type: string

  @Column({ default: UserStatus.ACTIVE })
  status: string

  toJSON() {
    const { password, ...self } = this;
    return self;
  }

  toDto() {
    const { password, ...dto } = this;
    return dto;
  }

  fromDto(payload: RegisterPayload): User {
    this.fullName = `${payload.firstName} ${payload.lastName}`;
    this.email = payload.email;
    this.phoneNumber = payload.phoneNumber;

    return this;
  }
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
