import { useEffect, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import type { ProcessedVideo, VideoFormValues } from './common/interfaces';
import { getCurrentDate } from './common/utils';
import { MODE, SORT_DIR, SORT_TYPE } from './common/enums';
import { addVideo, deleteVideo, editVideo, getVideoByID, getVideos } from './services/videos';
import { VideosTable } from './components/videos-table';
import { VideoForm } from './components/video-form';
import { Button } from './components/button';
import styles from './app.module.css';
import { SearchInput } from './components/search-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const App = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [mode, setMode] = useState<MODE>(MODE.ADD);
  const [editData, setEditData] = useState<VideoFormValues | null>(null);
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortType, setSortType] = useState<SORT_TYPE>(SORT_TYPE.NAME);
  const [sortDir, setSortDir] = useState<SORT_DIR>(SORT_DIR.ASC);

  useEffect(() => {
    getAllVideos();
  }, []);

  useEffect(() => {
    getAllVideos();
  }, [sortDir, sortType]);

  const getAllVideos = async () => {
    setLoading(true);
    await getVideos({ searchValue, sortType, sortDir }).then(setVideos);
    setLoading(false);
  };

  const handleSubmit = async (mode: MODE, { id, name, author, categories }: VideoFormValues) => {
    if (mode === MODE.ADD) {
      const payload = {
        id: Date.now(),
        name,
        author,
        catIds: categories,
        formats: {
          one: { res: '1080p', size: 1000 },
        },
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
    if (window.confirm('Are you sure, you want to delete?')) {
      await deleteVideo(id);
      getAllVideos();
    }
  };

  const handleSearch = () => {
    getAllVideos();
  };

  const handleSortChange = (type: SORT_TYPE, dir: SORT_DIR) => {
    setSortType(type);
    setSortDir(dir);
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
            <SearchInput value={searchValue} onChange={setSearchValue} onSearch={handleSearch} />
            {loading ? (
              <>
                Loading  <FontAwesomeIcon className={styles.icon} icon={faSpinner} />
              </>
            ) : (
              <VideosTable
                videos={videos}
                selectedSortType={sortType}
                selectedSortDir={sortDir}
                onSortChange={handleSortChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        ) : (
          <VideoForm mode={mode} editData={editData} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        )}
      </main>

      <footer className={styles.footer}>VManager Demo v0.0.1</footer>
    </>
  );
};
