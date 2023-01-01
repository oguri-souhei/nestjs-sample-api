import { Item } from 'src/entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemsDto } from './dto/create-items.dto';
import { ItemStatus } from './item-status.enum';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(itemDto: CreateItemsDto): Promise<Item> {
    const { name, price, description } = itemDto;
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await this.save(item);
    return item;
  }

  async updateItem(item: Item): Promise<Item> {
    await this.save(item);
    return item;
  }

  async deleteItem(id: string): Promise<void> {
    await this.delete({ id });
  }
}
