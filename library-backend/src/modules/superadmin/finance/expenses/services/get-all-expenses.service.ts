import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Expense } from '@/core/entities/expense.entity';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/pagination.interface';
import { ExpenseResponse } from '../interfaces/expenses.interfaces';

@Injectable()
export class GetAllExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async findAll(branchId?: string, paginationDto?: PaginationDto): Promise<PaginatedResponse<ExpenseResponse>> {
    const { page = 1, limit = 10, search, sortBy, sortOrder = 'DESC' } = paginationDto || {};
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

    const [items, total] = await this.expenseRepo.findAndCount({
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

    const data = items.map((e) => ({
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
