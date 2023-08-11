import HydrateClient from '@/lib/hydrate-client';
import getQueryClient from '@/lib/get-query-client';
import { dehydrate } from '@tanstack/react-query';
import { getBooks } from '@/api/bookApi';
import BooksList from '@/components/booksList';
import HeaderNav from '@/components/headerNav';
export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['books'], getBooks);
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrateClient state={dehydratedState}>
        <HeaderNav />
        <main>
          <BooksList />
        </main>
      </HydrateClient>
    </>
  );
}
