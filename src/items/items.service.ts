import { Injectable } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    return this.items.find((item) => item.id === id);
  }

  create(itemDto: CreateItemsDto) {
    const item = {
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
