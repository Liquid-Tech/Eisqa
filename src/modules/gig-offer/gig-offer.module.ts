import { Module } from '@nestjs/common';
import { GigOfferService } from './gig-offer.service';
import { GigOfferController } from './gig-offer.controller';

@Module({
  controllers: [GigOfferController],
  providers: [GigOfferService]
})
export class GigOfferModule {}
