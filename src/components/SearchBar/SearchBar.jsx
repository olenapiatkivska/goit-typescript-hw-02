import toast, { Toaster } from 'react-hot-toast';
import { IoMdSearch } from 'react-icons/io';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const searchBar = event.target.elements.query.value.trim();

    if (searchBar === '') {
      toast.error('Please add a query.');
      return;
    }
    onSubmit(searchBar);
    event.target.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.formSearchBar} onSubmit={handleSubmit}>
        <input
          className={css.formSearchInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.formSearchBtn} type="submit">
          <IoMdSearch size="20" />
        </button>
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </header>
  );
};

export default SearchBar;
