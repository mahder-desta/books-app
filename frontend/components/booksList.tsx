'use client';
import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';

import PullToRefresh from 'react-simple-pull-to-refresh';
import { getBooks } from '@/api/bookApi';
import BookItem from './bookItem';
import Link from 'next/link';
import BooksType from '@/types/booksType';

type Props = {};

function BooksList({}: Props) {
  const {
    data: books,
    refetch,

    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: getBooks,

    getNextPageParam: (lastPage: BooksType, pages) => {
      return pages.length * 10 < lastPage.total ? pages.length + 1 : undefined;
    },
  });

  const handleRefresh = async () => {
    const queryClient = getQueryClient();
    await queryClient.invalidateQueries({ queryKey: ['books'] });

    await refetch();
  };

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastBookRef = useCallback(
    (book: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((books) => {
        if (books[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (book) intObserver.current.observe(book);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return status === 'loading' ? (
    <p className="text-center">Loading...</p>
  ) : status === 'error' ? (
    <p className="text-center">Error fetching data</p>
  ) : (
    <>
      <PullToRefresh onRefresh={handleRefresh}>
        <div>
          <div className="grid gap-[2px] grid-cols-2 sm:grid-cols-3 mt-1">
            {books.pages?.map((group: BooksType, i) => (
              <React.Fragment key={i}>
                {group.books.map((book, index: number) => {
                  return (
                    <div key={index} className="rounded border border-transparent hover:border-accent-400">
                      <BookItem ref={lastBookRef} book={book} />
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-center text-accent-700 font-bold">
            <div>{isFetching && !isFetchingNextPage ? '...' : null}</div>
          </div>
        </div>
      </PullToRefresh>
    </>
  );
}

export default BooksList;
