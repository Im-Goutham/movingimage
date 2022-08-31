import { useEffect, useState } from 'react';

import type { ProcessedVideo, VideoFormValues } from './common/interfaces';
import { getCurrentDate } from './common/utils';
import { MODE } from './common/enums';
import { addVideo, deleteVideo, editVideo, getVideoByID, getVideos } from './services/videos';
import { VideosTable } from './components/videos-table';
import { VideoForm } from './components/video-form';
import { Button } from './components/button';
import styles from './app.module.css';

export const App = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [mode, setMode] = useState<MODE>(MODE.ADD);
  const [editData, setEditData] = useState<VideoFormValues | null>(null);
  const [showForm, setShowForm] = useState<Boolean>(false);

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = async () => {
    setLoading(true);
    await getVideos().then(setVideos);
    setLoading(false);
  };

  const handleSubmit = async (mode: MODE, { id, name, author, categories }: VideoFormValues) => {
    if (mode === MODE.ADD) {
      const payload = {
        id: Date.now(),
        name,
        author,
        catIds: categories,
        formats: [
          {
            one: { res: '1080p', size: 1000 },
          },
        ],
        releaseDate: getCurrentDate(),
      };
      await addVideo(payload);
      getAllVideos();
    } else if (mode === MODE.EDIT && id) {
      const payload = {
        id,
        name,
        author,
        catIds: categories,
      };
      await editVideo(payload);
      getAllVideos();
    }
    setShowForm(false);
  };

  const handleAdd = () => {
    setMode(MODE.ADD);
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = async (id: number) => {
    setMode(MODE.EDIT);
    await getVideoByID(id).then(setEditData);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteVideo(id);
    getAllVideos();
  };
  return (
    <>
      <header className={styles.header}>
        Videos
        {!showForm && (
          <Button primary onClick={handleAdd}>
            Add video
          </Button>
        )}
      </header>

      <main className={styles.main}>
        {!showForm ? (
          <>
            <h1>VManager Demo v0.0.1</h1>
            {loading ? <>Loading...</> : <VideosTable videos={videos} onEdit={handleEdit} onDelete={handleDelete} />}
          </>
        ) : (
          <VideoForm mode={mode} editData={editData} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        )}
      </main>

      <footer className={styles.footer}>VManager Demo v0.0.1</footer>
    </>
  );
};
