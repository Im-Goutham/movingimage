import type { ProcessedVideo, VideoFormValues } from '../common/interfaces';
import styles from './videos-table.module.css';

type VideosTableProps = {
  videos: ProcessedVideo[];
  onEdit: (values: VideoFormValues) => void;
  onDelete: (id: string) => void;
};

export const VideosTable = ({ videos, onEdit, onDelete }: VideosTableProps) => (
  <div className={styles.wrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Video Name</th>
          <th>Author</th>
          <th>Categories</th>
          <th>Highest quality format</th>
          <th>Release Date</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {videos.map(({ id, name, author, categories, highest_quality_format, release_date }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{author}</td>
            <td>{categories.join(', ')}</td>
            <td>{highest_quality_format}</td>
            <td>{release_date}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
