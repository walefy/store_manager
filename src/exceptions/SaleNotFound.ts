import { NotFoundException } from './NotFoundException';

export class SaleNotFound extends NotFoundException {
  constructor() {
    super('Sale');
  }
}
