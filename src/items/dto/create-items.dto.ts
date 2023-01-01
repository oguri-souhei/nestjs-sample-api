import { ItemStatus } from '../item-status.enum';

export class CreateItemsDto {
  name: string;
  price: number;
  description: string;
  status: ItemStatus;
}
