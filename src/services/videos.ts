import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo, VideoFormValues } from '../common/interfaces';

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);
  let videos = [
    {
      id: 1,
      name: 'video 1',
      author: 'author 1',
      categories: ['Comedy', 'Romance'],
      highest_quality_format: 'best 1080p',
      release_date: '12-09-2022',
    },
    {
      id: 12,
      name: 'video 2',
      author: 'author 2',
      categories: ['Comedy', 'Romance'],
      highest_quality_format: 'best 1080p',
      release_date: '12-09-2022',
    },
  ];
  return videos; // TODO: implement
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
