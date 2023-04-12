import { Item } from "./item.model";
import { User } from "./user.model";


export interface Order {
  id?: string,
  user: User,
  items: Item[],
  status?: string,
  subtotal?: number,
  shipping?: number,
  total?: number,
  createdAt?: Date,
  updatedAt?: Date,
}
