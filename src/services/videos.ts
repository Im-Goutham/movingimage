import { getCategories } from './categories';
import { getAuthorByID, getAuthors, updateAuthor } from './authors';
import { EditVideoPayload, ProcessedVideo, Video, VideoFormPayload, VideoFormValues } from '../common/interfaces';

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
  return 'Added successfully';
};

export const editVideo = async (payload: EditVideoPayload): Promise<string> => {
  const authors = await getAuthors();
  let video: Video | null = null;
  let updatedVideo: Video | null = null;
  authors.forEach((author) => {
    author.videos.forEach((data) => {
      if (payload.id == data.id) {
        video = { ...data };
        updatedVideo = {
          id: Date.now(),
          catIds: payload.catIds,
          name: payload.name,
          formats: video.formats,
          releaseDate: video.releaseDate,
        };
      }
    });
  });
  // // Remove from old author first
  await deleteVideo(payload.id);
  // // Update video data with new Author or same author
  if (updatedVideo != null) {
    const addPayload: VideoFormPayload = Object.assign({}, updatedVideo);
    addPayload.author = payload.author;
    await addVideo(addPayload);
  }
  return 'Edited successfully';
};

export const deleteVideo = async (videoId: number): Promise<string> => {
  const video = await getVideoByID(videoId);
  if (video) {
    const authorData = await getAuthorByID(video.author);
    const updateVideos = authorData.videos.filter(({ id }) => id !== videoId);
    authorData.videos = [...updateVideos];
    await updateAuthor(authorData);
  }
  return 'Deleted successfully';
};
