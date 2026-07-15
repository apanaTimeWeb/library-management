import { Controller } from '@nestjs/common';
import { AdminExpenseCategoriesService } from './expense-categories.service';

@Controller('api/admin/expense-categories')
export class AdminExpenseCategoriesController {
  constructor(private readonly service: AdminExpenseCategoriesService) {}
}
