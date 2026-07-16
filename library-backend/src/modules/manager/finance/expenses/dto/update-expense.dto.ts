import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from '@/modules/manager/finance/expenses/dto/create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
