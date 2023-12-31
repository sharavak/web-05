
import { useParams } from 'react-router-dom';
import FetchData from './FetchData';

const SearchResults = () => {
  const { searchText } = useParams();

  return (
    <FetchData cat={searchText} />
  );
};

export default SearchResults;
