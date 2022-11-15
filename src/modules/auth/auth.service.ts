import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { MailService } from '../../utils/mailer/mail.service';
import { RegisterPayload } from '.';
import { Hash } from '../../utils/Hash';
import { UsersService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LoginPayload } from './common/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailerservice: MailService,
  ) { }

  async createToken(
    user: User,
    expiryTime?: number | string,
    subject?: string,
  ) {
    return {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign(
        { uuid: user.uuid },
        {
          subject: subject ? process.env.JWT_SECRET_KEY + user.password : '',
          expiresIn: expiryTime ? expiryTime : process.env.JWT_EXPIRATION_TIME,
        },
      ),
      user,
    };
  }

  /**
   * Register a user and returns the token
   * @param payload
   * @returns
   */
  public async registerUser(payload: RegisterPayload) {
    const user = await this.userService.createUser(payload);
    return await this.createToken(user);
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmail(payload.email);
    if (!user) {
      throw new HttpException(
        ResponseMessage.INVALID_USERNAME_OR_PASSWORD,
        ResponseCode.BAD_REQUEST,
      );
    }
    const isValidPassword = await Hash.compare(payload.password, user.password);
    if (!isValidPassword) {
      throw new HttpException(
        ResponseMessage.INVALID_USERNAME_OR_PASSWORD,
        ResponseCode.BAD_REQUEST,
      );
    }
    return user;
  }

  /**
   * Send Password Recovery Link To User Email
   * @param email
   * @returns
   */
  public async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.getByEmail(email);
    if (user) {
      const token = await this.createToken(
        user,
        process.env.JWT_TIME_FORGOT_PASSWORD,
        user.password,
      );
      await this.mailerservice.sendForgotPasswordMail(
        user.email,
        token.accessToken,
      );
      return;
    } else {
      throw new HttpException(
        ResponseMessage.EMAIL_NOT_REGISTERED,
        ResponseCode.NOT_FOUND,
      );
    }
  }

  async checkPasswordLinkExpiry(email: string, token: string) {
    try {
      const user = await this.userService.getByEmail(email);
      const subject = process.env.JWT_SECRET_KEY + user.password;
      this.jwtService.verify(token, { subject });
      return;
    } catch (err) {
      throw new HttpException(
        ResponseMessage.RESET_PASSWORD_LINK_EXPIRED,
        ResponseCode.NOT_FOUND,
      );
    }
  }

  /**
   * Confirm the forgot password and update
   * @param email
   * @param password
   * @returns
   */
  public async confirmForgotPassword(email: string, password: string) {
    await this.userService.confirmForgotPassword(email, password);
    return;
  }
}
