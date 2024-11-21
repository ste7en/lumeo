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
    <div className="relative w-full aspect-[4/3]">
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash image'}
        className={"absolute top-0 left-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"}
        onLoad={onLoad}
      />
      {!loaded && (
        <Blurhash
          hash={image.blur_hash}
          width={'100%'}
          height={'100%'}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ImageGridItem
