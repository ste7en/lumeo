import axios, { AxiosInstance, isAxiosError } from 'axios';
import { ApiRoutes } from './routes';
import { UnsplashError, UnsplashPhoto, UnsplashSearchResponse } from '@lumeo/shared-types';
import { UnsplashClientError } from './errors';

export class UnsplashClient {
  private apiKey: string;
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: 'https://api.unsplash.com',
      headers: {
        Authorization: `Client-ID ${this.apiKey}`,
      },
    });
  }

  private formatError(message: string, error: unknown) {
    if (isAxiosError<UnsplashError>(error) && error.response) {
      return new UnsplashClientError(message, error.response.status, error.response.data.errors);
    }
    return new Error(`A generic error occurred: ${error}`);
  }

  async searchPhotos(query: string, page = 1, perPage = 10) {
    try {
      const response = await this.client.get<UnsplashSearchResponse>(ApiRoutes.searchPhotos, {
        params: {
          query,
          page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw this.formatError('Error searching photos', error);
    }
  }

  async listPhotos(page = 1, perPage = 10) {
    try {
      const response = await this.client.get<UnsplashPhoto[]>(ApiRoutes.listPhotos, {
        params: {
          page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      throw this.formatError('Error listing photos', error);
    }
  }

  async getPhoto(id: string) {
    try {
      const response = await this.client.get<UnsplashPhoto>(`${ApiRoutes.getPhoto}/${id}`);
      return response.data;
    } catch (error) {
      throw this.formatError('Error getting photo', error);
    }
  }
}
