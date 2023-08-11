import React from 'react';
import BookType from '@/types/bookType';
import Image from 'next/image';

type Props = {
  book: BookType;
};

const BookItem = React.forwardRef<HTMLDivElement, Props>(({ book }: Props, ref) => {
  return (
    <div ref={ref ? ref : ''} className=" relative flex flex-col gap-1 ">
      <div className="relative h-[200px]  overflow-hidden">
        <Image
          alt={book.title}
          src={book.coverImage}
          fill
          quality={75}
          className="h-auto w-auto aspect-square object-cover transition-all hover:scale-105"
        />
      </div>
      <div className="flex flex-col p-1 pb-5 px-4 gap-1">
        <h2 className="text-accent-1000 font-medium text-sm truncate">{book.title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-error-500 font-bold text-sm">{book.discountRate}%</p>
          <p className="font-bold text-accent-1100">
            {book.price} <span className="text-accent-1000 text-sm">원</span>
          </p>
        </div>
      </div>
    </div>
  );
});

export default BookItem;
