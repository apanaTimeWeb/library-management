import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';
import { ExpenseListItem } from '@/modules/manager/finance/expenses/interfaces/expenses.interfaces';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/pagination.interface';

@Injectable()
export class GetAllExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async findAll(
    branchId?: string,
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponse<ExpenseListItem>> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy,
      sortOrder = 'DESC',
    } = paginationDto || {};
    const skip = (page - 1) * limit;

    const where: any = branchId ? { branch: { id: branchId } } : {};
    if (search) {
      where.description = ILike(`%${search}%`);
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = sortOrder;
    } else {
      order.createdAt = 'DESC';
    }

    const [expenses, total] = await this.expenseRepo.findAndCount({
      where,
      relations: {
        branch: true,
        category: true,
        addedBy: true,
      },
      order,
      skip,
      take: limit,
    });

    const data = expenses.map((e) => ({
      id: e.id,
      date: e.expenseDate
        ? new Date(e.expenseDate).toLocaleDateString('en-IN')
        : e.createdAt.toLocaleDateString('en-IN'),
      category: e.category?.name || 'Uncategorized',
      amount: e.amount,
      description: e.description,
      branch: e.branch?.name || 'N/A',
      recordedBy: e.addedBy?.name || 'System',
    }));

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
