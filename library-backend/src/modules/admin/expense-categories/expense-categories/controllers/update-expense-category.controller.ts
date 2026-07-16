import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateExpenseCategoryService } from '../services/update-expense-category.service';
import { UpdateExpenseCategoryDto } from '../dto/update-expense-category.dto';

@Controller('api/v1/admin/expense-categories')
export class UpdateExpenseCategoryController {
  constructor(private readonly service: UpdateExpenseCategoryService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateExpenseCategoryDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'ExpenseCategory updated successfully', data };
  }
}
