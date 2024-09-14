import css from './ImageCard.module.css';

const ImageCard = ({ image, onModalOpen }) => {
  return (
    <div className={css.boxImageCard}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={onModalOpen}
      />
    </div>
  );
};

export default ImageCard;
