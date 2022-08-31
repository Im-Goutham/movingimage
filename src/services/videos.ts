import { getCategories } from './categories';
import { getAuthorByID, getAuthors, updateAuthor } from './authors';
import { ProcessedVideo, VideoFormPayload, VideoFormValues } from '../common/interfaces';

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  let categoriesSet: Record<string, string> = {};

  categories.forEach(({ id, name }) => {
    categoriesSet[id] = name;
  });

  const videos: ProcessedVideo[] = [];
  authors.forEach((author) => {
    author.videos.forEach(({ id, name, catIds, releaseDate }) => {
      const categories: string[] = catIds.map((catId) => {
        return categoriesSet[catId];
      });

      videos.push({
        id,
        name,
        author: author.name,
        categories,
        highest_quality_format: 'best 1080p', // TODO
        release_date: releaseDate,
      });
    });
  });

  return videos;
};

export const getVideoByID = async (videoId: number): Promise<VideoFormValues | null> => {
  const authors = await getAuthors();
  let video: VideoFormValues | null = null;
  authors.forEach((author) => {
    author.videos.forEach(({ id, name, catIds }) => {
      if (videoId == id) {
        video = { id, name, author: author.id, categories: catIds };
      }
    });
  });
  return video;
};

export const addVideo = async (payload: VideoFormPayload): Promise<string> => {
  const authorData = await getAuthorByID(payload.author);
  authorData.videos.push(payload);
  await updateAuthor(authorData);
  return 'Video is successfully added';
};

export const editVideo = async (payload: VideoFormPayload): Promise<string> => {
  // TODO
  return '';
};
