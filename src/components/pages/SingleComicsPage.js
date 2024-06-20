import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicsPage.scss';

const SingleComicsPage = () => {
  const {comicId} = useParams();
  const [comic, setComic] = useState(null);

  const {loading, error, getComic, clearError} = useMarvelService();

  useEffect(() => {
    updateComic()
}, [comicId])

const updateComic = () => {
  clearError();
  getComic(comicId)
      .then(console.log(comic))
      .then(onComicLoaded)
}

const onComicLoaded = (comic) => {
  setComic(comic);
}

const errorMsg = error ? <ErrorMessage></ErrorMessage> : null;
const loadingSpinner = loading ? <Spinner></Spinner> : null;
const charContent = !(loading || error || !comic) ? <View comic={comic}></View> : null;

    return (
      <>
        {errorMsg}
        {loadingSpinner}
        {charContent}
      </>
    )
}


const View = ({comic}) => {
  const {title, description, pageCount, thumbnail, language, price} = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
          <h2 className="single-comic__name">{title}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">{pageCount}</p>
          <p className="single-comic__descr">Language: {language}</p>
          <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
  )
}
export default SingleComicsPage;