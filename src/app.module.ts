import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GigModule } from './gig/gig.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { LevelModule } from './level/level.module';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { BadgeModule } from './badge/badge.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SkillModule } from './skill/skill.module';
import { EducationModule } from './education/education.module';
import { CertificationModule } from './certification/certification.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { GigOfferModule } from './gig-offer/gig-offer.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.local.env',
          //envFilePath:'.prod.env'
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get('DB_SYNC'),
        entities: [__dirname + './../**/*.entity.{js, ts}'],
        logging: true,
      }),
      inject: [ConfigService],
    }),
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
export class AppModule {}
