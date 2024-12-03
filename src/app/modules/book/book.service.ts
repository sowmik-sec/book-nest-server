import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (bookData: IBook): Promise<IBook> => {
  return await Book.create(bookData);
};

export const BookService = {
  createBook,
};
