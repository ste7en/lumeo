import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { UnsplashPhoto } from '@lumeo/shared-types';
import { useFavorites } from '../store/useFavorites';
import { useComments } from '../store/useComments';

interface ImageDetailsProps {
  image: UnsplashPhoto;
}

export const ImageDetails: React.FC<ImageDetailsProps> = ({ image }) => {
  const [comment, setComment] = React.useState('');
  const {addFavorite, removeFavorite, isFavorite} = useFavorites();
  const {addComment, getCommentsByPhotoId} = useComments();
  const favorite = isFavorite(image.id);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(image.id, comment);
      setComment('');
    }
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(image.id);
    } else {
      addFavorite(image);
    }
  };

  const comments = getCommentsByPhotoId(image.id);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash image'}
        className="w-full aspect-video object-cover"
      />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={image.user?.profile_image?.small}
              alt={image.user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{image.user?.name}</h3>
              <p className="text-sm text-gray-500">@{image.user?.username}</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={toggleFavorite}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
            >
              <Heart
                className={`w-6 h-6
                  ${favorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
              <span>{favorite ? image.likes + 1 : image.likes}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium mb-2 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comments
          </h4>

          <form onSubmit={handleAddComment} className="mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">You</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
