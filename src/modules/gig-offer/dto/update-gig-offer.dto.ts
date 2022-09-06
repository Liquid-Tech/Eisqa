import { PartialType } from '@nestjs/mapped-types';
import { CreateGigOfferDto } from './create-gig-offer.dto';

export class UpdateGigOfferDto extends PartialType(CreateGigOfferDto) {}
