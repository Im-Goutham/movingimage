import type { ProcessedVideo } from '../common/interfaces';
import { Button } from './button';
import styles from './videos-table.module.css';

type VideosTableProps = {
  videos: ProcessedVideo[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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
              <Button primary onClick={() => onEdit(id)}>Edit</Button>
              <Button danger onClick={() => onDelete(id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
