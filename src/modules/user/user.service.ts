import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from '../../utils/Hash';
import { RegisterPayload } from 'modules/auth';
import { Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';

import { User, UserFillableFields } from './user.entity';
import { CreateUserDto } from './common/user.dto';
import { UserTypes } from './common/user.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async get(uuid: string) {
    return this.userRepository.findOne({ uuid });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async create(payload: CreateUserDto) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new HttpException(ResponseMessage.USER_ALREADY_EXISTS, ResponseCode.ALREADY_EXIST);
    }
    return await this.userRepository.save(payload);
  }

  /**
   * Create a user
   * @param payload
   * @returns
   */
  async createUser(payload: RegisterPayload): Promise<User> {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new HttpException(
        ResponseMessage.USER_ALREADY_EXISTS,
        ResponseCode.BAD_REQUEST,
      );
    }
    const newUser = new User().fromDto(payload);
    newUser.password = await Hash.make(payload.password);
    newUser.type = UserTypes.FREELANCER;
    return await this.userRepository.save(newUser);
  }

  /**
   * Forget password confirmation
   * @param email
   * @param password
   * @returns
   */
  public async confirmForgotPassword(email: string, password: string) {
    const user: User = await this.userRepository.findOne({ email });
    if (user) {
      const passwordHash = await Hash.make(password);
      await this.userRepository.update({ email }, { password: passwordHash });
      return user;
    } else {
      throw new HttpException(
        ResponseMessage.USER_DOES_NOT_EXIST,
        ResponseCode.NOT_FOUND,
      );
    }
  }
}
