import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onModalOpen }) => {
  return (
    <ul className={css.imageGalleryList}>
      {images.map(image => {
        return (
          <li className={css.imageGalleryListItem} key={image.id}>
            <ImageCard
              image={image}
              onModalOpen={() =>
                onModalOpen(
                  image.urls.regular,
                  image.alt_description,
                  image.likes,
                  image.user.name,
                )
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
