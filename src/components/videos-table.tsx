import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { SORT_DIR, SORT_TYPE } from '../common/enums';
import type { ProcessedVideo } from '../common/interfaces';
import { Button } from './button';
import styles from './videos-table.module.css';

type VideosTableProps = {
  videos: ProcessedVideo[];
  selectedSortType: SORT_TYPE;
  selectedSortDir: SORT_DIR;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSortChange: (type: SORT_TYPE, dir: SORT_DIR) => void;
};

const fields = [
  { sortType: SORT_TYPE.NAME, name: 'Video Name' },
  { sortType: SORT_TYPE.AUTHOR, name: 'Author' },
  { sortType: SORT_TYPE.CATEGORIES, name: 'Categories' },
  { sortType: SORT_TYPE.HIGHEST_QUALITY_FORMAT, name: 'Highest quality format' },
  { sortType: SORT_TYPE.RELEASE_DATE, name: 'Release Date' },
];

export const VideosTable = ({ videos, selectedSortType, selectedSortDir, onEdit, onDelete, onSortChange }: VideosTableProps) => {
  const handleSort = (sortType: SORT_TYPE) => {
    onSortChange(sortType, selectedSortDir === SORT_DIR.ASC ? SORT_DIR.DSC : SORT_DIR.ASC);
  };
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <>
              {fields.map(({ sortType, name }, key) => {
                return (
                  <th key={key} onClick={() => handleSort(sortType)}>
                    {name}
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={sortType !== selectedSortType ? faSort : selectedSortDir == SORT_DIR.ASC ? faSortDown : faSortUp}
                    />
                  </th>
                );
              })}
              <th>Options</th>
            </>
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
                <Button primary onClick={() => onEdit(id)}>
                  Edit
                </Button>
                <Button danger onClick={() => onDelete(id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
