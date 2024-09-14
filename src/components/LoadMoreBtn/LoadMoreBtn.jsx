import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMoreBtn }) => {
  return (
    <>
      <button type="button" onClick={onLoadMoreBtn} className={css.loadMoreBtn}>
        Load more
      </button>
    </>
  );
};

export default LoadMoreBtn;
