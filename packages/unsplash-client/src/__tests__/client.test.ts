import nock from 'nock';
import { UnsplashClient } from '../lib/client';
import { UnsplashClientError } from '../lib/errors';

describe('UnsplashClient', () => {
  let client: UnsplashClient;

  beforeEach(() => {
    client = new UnsplashClient('test_api_key');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should include the API key in the request headers', async () => {
    const mockResponse = {};

    const scope = nock('https://api.unsplash.com', {
      reqheaders: {
        Authorization: 'Client-ID test_api_key',
      },
    })
      .get('/search/photos')
      .query({ query: 'test', page: 1, per_page: 10 })
      .reply(200, mockResponse);

    const result = await client.searchPhotos('test');
    expect(result).toEqual(mockResponse);
    expect(scope.isDone()).toBe(true); // Ensure the request was made with the correct headers
  });

  it('should search photos successfully', async () => {
    const mockResponse = {
      total: 1,
      total_pages: 1,
      results: [
        {
          id: '1',
          urls: { full: 'http://example.com/photo1.jpg' },
          description: 'A test photo',
          alt_description: 'A test photo',
        },
      ],
    };

    nock('https://api.unsplash.com')
      .get('/search/photos')
      .query({ query: 'test', page: 1, per_page: 10 })
      .reply(200, mockResponse);

    const result = await client.searchPhotos('test');
    expect(result).toEqual(mockResponse);
  });

  it('should handle search photos error', async () => {
    const mockErrorResponse = {
      errors: ['Invalid API key'],
    };

    nock('https://api.unsplash.com')
      .get('/search/photos')
      .query({ query: 'test', page: 1, per_page: 10 })
      .reply(401, mockErrorResponse);

    await expect(client.searchPhotos('test')).rejects.toThrow(UnsplashClientError);
  });

  it('should get a photo successfully', async () => {
    const mockPhoto = {
      id: '1',
      urls: { full: 'http://example.com/photo1.jpg' },
      description: 'A test photo',
      alt_description: 'A test photo',
    };

    nock('https://api.unsplash.com')
      .get('/photos/1')
      .reply(200, mockPhoto);

    const result = await client.getPhoto('1');
    expect(result).toEqual(mockPhoto);
  });

  it('should handle get photo error', async () => {
    const mockErrorResponse = {
      errors: ['Photo not found'],
    };

    nock('https://api.unsplash.com')
      .get('/photos/1')
      .reply(404, mockErrorResponse);

    await expect(client.getPhoto('1')).rejects.toThrow(UnsplashClientError);
  });

  it('should list photos successfully', async () => {
    const mockPhotos = [
      {
        id: '1',
        urls: { full: 'http://example.com/photo1.jpg' },
        description: 'A test photo',
        alt_description: 'A test photo',
      },
      {
        id: '2',
        urls: { full: 'http://example.com/photo2.jpg' },
        description: 'Another test photo',
        alt_description: 'Another test photo',
      },
    ];

    nock('https://api.unsplash.com')
      .get('/photos')
      .query({ page: 1, per_page: 10 })
      .reply(200, mockPhotos);

    const result = await client.listPhotos(1, 10);
    expect(result).toEqual(mockPhotos);
  });

  it('should handle list photos error', async () => {
    const mockErrorResponse = {
      errors: ['Invalid API key'],
    };

    nock('https://api.unsplash.com')
      .get('/photos')
      .query({ page: 1, per_page: 10 })
      .reply(401, mockErrorResponse);

    await expect(client.listPhotos(1, 10)).rejects.toThrow(UnsplashClientError);
  });
});
