/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length > 0) {
      let income = 0;
      let outcome = 0;
      let total = 0;
      this.transactions.forEach(transaction => {
        if (transaction.type === 'income') {
          income += transaction.value;
          total += transaction.value;
        } else {
          outcome += transaction.value;
          total -= transaction.value;
        }
      });
      return { income, outcome, total };
    }
    return { income: 0, outcome: 0, total: 0 };
  }

  public create({ title, value, type }: TransactionRepositoryDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
