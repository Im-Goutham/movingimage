import styles from './search-input.module.css';

type SearchInputProps = { value: string; onChange: (value: string) => void; onSearch: () => void };

export const SearchInput = ({ value, onChange, onSearch }: SearchInputProps) => {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="search" id="search" name="search" value={value} onChange={(e) => onChange(e.target.value)} />
      <button className={styles.button} onClick={onSearch}>Search</button>
    </div>
  );
};
