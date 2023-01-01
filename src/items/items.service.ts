import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items = [];

  findAll() {
    return 'called findAll()';
  }

  create(item: Item) {
    this.items.push(item);
    return this.items;
  }
}
