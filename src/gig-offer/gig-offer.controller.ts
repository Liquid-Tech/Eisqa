import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GigOfferService } from './gig-offer.service';
import { CreateGigOfferDto } from './dto/create-gig-offer.dto';
import { UpdateGigOfferDto } from './dto/update-gig-offer.dto';

@Controller('gig-offer')
export class GigOfferController {
  constructor(private readonly gigOfferService: GigOfferService) {}

  @Post()
  create(@Body() createGigOfferDto: CreateGigOfferDto) {
    return this.gigOfferService.create(createGigOfferDto);
  }

  @Get()
  findAll() {
    return this.gigOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gigOfferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGigOfferDto: UpdateGigOfferDto) {
    return this.gigOfferService.update(+id, updateGigOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gigOfferService.remove(+id);
  }
}
