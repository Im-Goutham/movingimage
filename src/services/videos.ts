import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo, VideoFormValues } from '../common/interfaces';

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

      const video: ProcessedVideo = {
        id,
        name,
        author: author.name,
        categories,
        highest_quality_format: 'best 1080p', // TODO
        release_date: releaseDate,
      };

      videos.push(video);
    });
  });

  return videos;
};

export const getVideoByID = async (id: number): Promise<VideoFormValues> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);
  let video = {
    id: 1,
    name: 'video 1',
    author: 2,
    categories: [2, 1],
  };
  return video; // TODO: implement
};
