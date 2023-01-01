import { ItemStatus } from '../item-status.enum';

export class CreateItemsDto {
  id: string;
  name: string;
  price: number;
  description: string;
  status: ItemStatus;
}
