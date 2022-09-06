import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth';
import { CommonModule } from './../common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'modules/user/user.module';
import { GigModule } from 'modules/gig/gig.module';
import { RoleModule } from 'modules/role/role.module';
import { CategoryModule } from 'modules/category/category.module';
import { LevelModule } from 'modules/level/level.module';
import { OrderModule } from 'modules/order/order.module';
import { MessageModule } from 'modules/message/message.module';
import { FeedbackModule } from 'modules/feedback/feedback.module';
import { EducationModule } from 'modules/education/education.module';
import { SubCategoryModule } from 'modules/sub-category/sub-category.module';
import { CertificationModule } from 'modules/certification/certification.module';
import { SkillModule } from 'modules/skill/skill.module';
import { BadgeModule } from 'modules/badge/badge.module';
import { NotificationModule } from 'modules/notification/notification.module';
import { GigOfferModule } from 'modules/gig-offer/gig-offer.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return await AppService.createConnection();
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [AppService.envConfiguration()],
    }),
    AuthModule,
    CommonModule,
    UserModule,
    GigModule,
    RoleModule,
    CategoryModule,
    OrderModule,
    LevelModule,
    NotificationModule,
    MessageModule,
    BadgeModule,
    FeedbackModule,
    SkillModule,
    EducationModule,
    CertificationModule,
    SubCategoryModule,
    GigOfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
