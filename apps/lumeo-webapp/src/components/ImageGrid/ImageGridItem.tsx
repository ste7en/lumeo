import { UnsplashPhoto } from "@lumeo/shared-types";
import React from "react"
import { Blurhash } from "react-blurhash";

interface ImageGridItemProps {
  image: UnsplashPhoto;
}

const ImageGridItem: React.FC<ImageGridItemProps> = ({ image }) => {
  const [loaded, setLoaded] = React.useState(false);
  const onLoad = () => {
    setLoaded(true);
  }
  return (
    <div className="relative w-full">
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash image'}
        className={"w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"}
        onLoad={onLoad}
      />
      {!loaded && (
        <Blurhash
          hash={image.blur_hash}
          width={image.width}
          className="w-full h-auto object-cover"
        />
      )}
    </div>
  );
};

export default ImageGridItem;
