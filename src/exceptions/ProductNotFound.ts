import { NotFoundException } from './NotFoundException';

export class ProductNotFound extends NotFoundException {
  constructor() {
    super('Product');
  }
}
