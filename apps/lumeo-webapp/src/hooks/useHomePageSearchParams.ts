import { useSearchParams } from 'react-router-dom';

export const useHomePageSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({ query: '', page: '1' });
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query') || '';

  const setQuery = (query: string) => {
    setSearchParams({ query, page: '1' });
  };

  const setPage = (page: number) => {
    setSearchParams({ query, page: String(page) });
  };

  return { query, page, setQuery, setPage };
};
