import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemsDto } from './dto/create-items.dto';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';
import { ItemStatus } from './item-status.enum';
import { User } from '../entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

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

  async create(itemDto: CreateItemsDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(itemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    return await this.itemRepository.updateItem(item);
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new NotFoundException('対象の商品が見つかりませんでした');
    }
    if (item.userId !== user.id) {
      throw new BadRequestException(
        '出品者以外がこの商品を削除することはできません',
      );
    }
    await this.itemRepository.delete(item);
  }
}
