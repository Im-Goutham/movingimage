import type { Author } from '../common/interfaces';

export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors`);

  return response.json() as unknown as Author[];
};

export const getAuthorByID = async (authorID: number): Promise<Author> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors/${authorID}`);

  return response.json() as unknown as Author;
};

export const updateAuthor = async (payload: Author): Promise<Author> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return response.json() as unknown as Author;
};
