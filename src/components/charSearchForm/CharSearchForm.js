import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

const CharSearchForm = () => {

  const [char, setChar] = useState(null);
  const {getCharByName, clearError} = useMarvelService();

  const onCharLoaded = (char) => {
      setChar(char);
      console.log(char);
  }

  const updateChar = (name) => {
      clearError();
      getCharByName(name)
          .then(onCharLoaded);
  }

    return (
        <div className="char__search-form">
            <Formik
              initialValues = {{
                charName: ''
              }}
              validationSchema = {Yup.object({
                charName: Yup.string().required('This field is required')
              })}
              onSubmit = {({charName}) => {
                updateChar(charName)
              }}
            >
              <Form>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                  <Field 
                    id="charName" 
                    name='charName' 
                    type='text' 
                    placeholder="Enter name"/>
                  <button 
                      type='submit' 
                      className="button button__main">
                      <div className="inner">find</div>
                  </button>
                </div>
                <FormikErrorMessage component="div" className="char__search-error" name="charName" />
              </Form>
            </Formik>
        </div>
    )
}

export default CharSearchForm;