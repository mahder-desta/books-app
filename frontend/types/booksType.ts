import BookType from './bookType';

export default interface BooksType {
  hasNext: boolean;
  data: BookType[];
  totalPage: number;
}
