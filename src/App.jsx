import { useState, useEffect, useRef } from 'react';
import { fetchImages } from './unsplash-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import toast from 'react-hot-toast';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

import './App.css';

function App() {
  const INITIAL_MODAL_PARAMS = {
    modalIsOpen: false,
    urlRegular: '',
    imgAlt: '',
    likes: '',
    userName: '',
  };

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [modal, setModal] = useState(INITIAL_MODAL_PARAMS);

  const appElementRef = useRef();

  useEffect(() => {
    async function getImages() {
      try {
        setError(false);
        if (query === '') {
          setLoadMoreBtn(false);
          return;
        }
        setLoading(true);
        const data = await fetchImages(query, page);
        console.log(data);
        if (data.total === 0) {
          setLoadMoreBtn(false);
          toast('There are no results!');
          return;
        }
        setImages(prevImages => [...prevImages, ...data.results]);
        setLoadMoreBtn(data.total_pages !== page);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const handleSearch = userQuery => {
    setQuery(userQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleModalOpen = (urlRegular, imgAlt, likes, userName) => {
    setModal({
      modalIsOpen: true,
      urlRegular,
      imgAlt,
      likes,
      userName,
    });
    console.log(modal);
  };
  const handleModalClose = () => {
    setModal(INITIAL_MODAL_PARAMS);
  };

  useEffect(() => {
    if (page === 1) return;
    appElementRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    console.log('ghjjkk');
  }, [page, images]);

  return (
    <div ref={appElementRef}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onModalOpen={handleModalOpen} />
      )}
      {loadMoreBtn && !loading && (
        <LoadMoreBtn onLoadMoreBtn={handleLoadMore} />
      )}
      {loading && <Loader />}
      <ImageModal onModalClose={handleModalClose} modalData={modal} />
    </div>
  );
}

export default App;
