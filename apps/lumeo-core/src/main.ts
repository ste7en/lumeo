import { PaginationParams, UnsplashError, UnsplashSearchParams, UnsplashSearchResponse } from '@lumeo/shared-types';
import { UnsplashClient, UnsplashClientError } from '@lumeo/unsplash-client';
import express from 'express';
import { SearchById } from './types';

const app = express();
const port = process.env.PORT || 3333;
const client = new UnsplashClient(process.env.UNSPLASH_ACCESS_KEY);

app.get<PaginationParams>('/api/photos', async (req, res) => {
  try {
    const data = await client.listPhotos(req.params.page, req.params.per_page);
    return res.json(data);
  } catch (error) {
    if (error instanceof UnsplashClientError) {
      return res.status(error.status).json({ errors: error.errors });
    }
    return res.status(500).json({ errors: [error.message] });
}});

app.get<undefined, UnsplashSearchResponse | UnsplashError, undefined, UnsplashSearchParams>('/api/search', async (req, res) => {
  try {
    const data = await client.searchPhotos(req.query.query, req.query.page, req.query.per_page);
    return res.json(data);
  } catch (error) {
    if (error instanceof UnsplashClientError) {
      return res.status(error.status).json({ errors: error.errors });
    }
    return res.status(500).json({ errors: [error.message] });
}});

app.get<SearchById>(`/api/photos/:id`, async (req, res) => {
  try {
    const data = await client.getPhoto(req.params.id);
    return res.json(data);
  } catch (error) {
    if (error instanceof UnsplashClientError) {
      return res.status(error.status).json({ errors: error.errors });
    }
    return res.status(500).json({ errors: [error.message] });
}});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
