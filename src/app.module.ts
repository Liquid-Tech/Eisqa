import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { GigModule } from './modules/gig/gig.module';
import { RoleModule } from './modules/role/role.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { LevelModule } from './modules/level/level.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MessageModule } from './modules/message/message.module';
import { BadgeModule } from './modules/badge/badge.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { SkillModule } from './modules/skill/skill.module';
import { EducationModule } from './modules/education/education.module';
import { CertificationModule } from './modules/certification/certification.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { GigOfferModule } from './modules/gig-offer/gig-offer.module';

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
export class AppModule { }
