import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';
import { ItemStatus } from './item-status.enum';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items = [];

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(itemDto: CreateItemsDto): Promise<Item> {
    return await this.itemRepository.createItem(itemDto);
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return await this.itemRepository.updateItem(item);
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.deleteItem(id);
  }
}
