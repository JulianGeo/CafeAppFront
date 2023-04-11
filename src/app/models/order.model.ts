import { Item } from "./item.model";
import { User } from "./user.model";


export interface Order {
  id?: string,
  user: User,
  items?: Item[],
  itemsQuantity?:  Map<string, number>,
  status?: number,
  subtotal?: Number,
  shipping?: Number,
  total?: Number,
  createdAt?: Date,
  updatedAt?: Date,
}
