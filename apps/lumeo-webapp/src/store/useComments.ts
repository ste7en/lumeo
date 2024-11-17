import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment } from '../types';

const generateRandomId = () => Math.random().toString(36).substr(2, 9);

interface CommentsState {
  comments: Record<string, Comment[]>;
  addComment: (photoId: string, text: string) => void;
  removeComment: (id: string, photoId: string) => void;
  getCommentsByPhotoId: (photoId: string) => Comment[];
}

export const useComments = create<CommentsState>()(
  persist(
    (set, get) => ({
      comments: {},
      addComment: (photoId, text) => {
        const newComment: Comment = {
          id: generateRandomId(),
          photoId,
          text,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          comments: {
            ...state.comments,
            [photoId]: [
              ...(state.comments[photoId] ?? []),
              newComment,
            ],
          },
        }));
      },
      removeComment: (id, photoId) =>
        set((state) => ({
          comments: {
            ...state.comments,
            [photoId]: state.comments[photoId].filter(
              (comment) => comment.id !== id
            ),
          },
        })),
      getCommentsByPhotoId: (photoId) => get().comments[photoId] ?? [],
    }),
    {
      name: 'comments-storage',
    }
  )
);
