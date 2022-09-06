import { Injectable } from '@nestjs/common';
import { CreateGigOfferDto } from './dto/create-gig-offer.dto';
import { UpdateGigOfferDto } from './dto/update-gig-offer.dto';

@Injectable()
export class GigOfferService {
  create(createGigOfferDto: CreateGigOfferDto) {
    return 'This action adds a new gigOffer';
  }

  findAll() {
    return `This action returns all gigOffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gigOffer`;
  }

  update(id: number, updateGigOfferDto: UpdateGigOfferDto) {
    return `This action updates a #${id} gigOffer`;
  }

  remove(id: number) {
    return `This action removes a #${id} gigOffer`;
  }
}
