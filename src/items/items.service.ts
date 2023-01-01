import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  private items = [
    {
      id: 'b387bc6b-694b-4790-a6da-64bd622d9a8c',
      name: 'foo',
      price: 1000,
      description: 'this is foo.',
      status: ItemStatus.ON_SALE,
    },
    {
      id: 'b387bc6b-694b-4790-a6da-64bd622d9a8d',
      name: 'bar',
      price: 2000,
      description: 'this is bar.',
      status: ItemStatus.ON_SALE,
    },
  ];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  create(itemDto: CreateItemsDto) {
    const item = {
      id: uuid(),
      ...itemDto,
      status: ItemStatus.ON_SALE,
    };
    this.items.push(item);
    return this.items;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
