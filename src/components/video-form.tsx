import { Field, Formik, FormikErrors } from 'formik';
import { useEffect, useState } from 'react';
import { MODE } from '../common/enums';
import { Author, Category, VideoFormValues } from '../common/interfaces';
import { getAuthors } from '../services/authors';
import { getCategories } from '../services/categories';
import { Button } from './button';

type VideoFormProps = {
  mode: MODE;
  editData?: VideoFormValues | null;

  onSubmit: (mode: MODE, values: VideoFormValues) => void;
  onCancel: () => void;
};

const initialValues = { name: '', author: -1, categories: [] };

export const VideoForm = ({ mode, editData = initialValues, onSubmit, onCancel }: VideoFormProps) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
    getCategories().then(setCategories);
  }, []);

  const formValues = { ...initialValues, ...editData };
  return (
    <Formik
      initialValues={formValues}
      validate={(values: VideoFormValues) => {
        const errors: FormikErrors<VideoFormValues> = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.author || values.author == -1) {
          errors.author = 'Required';
        }
        if (values.categories.length === 0) {
          errors.categories = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSubmit(mode, values);
      }}>
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field name="name" onChange={handleChange} value={values.name} placeholder="Enter video name" />
            {errors.name && touched.name && errors.name}
            <Field
              component="select"
              id="author"
              name="author"
              value={values.author}
              placeholder="Select author"
              multiple={false}
              onChange={handleChange}>
              <option value={-1} key={-1}>
                Select author
              </option>
              {authors.map(({ id, name }) => {
                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </Field>
            {errors.author && touched.author && errors.author}
            <Field component="select" id="categories" name="categories" value={values.categories} multiple={true} onChange={handleChange}>
              {categories.map(({ id, name }) => {
                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </Field>
            {errors.categories && touched.categories && errors.categories}
            <Button primary type="submit" disabled={isSubmitting}>
              {mode == MODE.ADD ? 'Save' : 'Update'}
            </Button>
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};
