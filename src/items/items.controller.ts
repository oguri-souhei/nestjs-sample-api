import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ) {
    return this.itemsService.create({
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
    });
  }
}
