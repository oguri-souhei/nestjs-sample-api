import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items = [];

  findAll() {
    return this.items;
  }

  findById(id: string) {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(itemDto: CreateItemsDto): Promise<Item> {
    return await this.itemRepository.createItem(itemDto);
  }

  updateStatus(id: string) {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
