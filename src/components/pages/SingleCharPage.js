import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleCharPage.scss';

const SingleCharPage = () => {
  const {charId} = useParams();
  const [char, setChar] = useState(null);

  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar()
}, [charId])

const updateChar = () => {
  clearError();
  getCharacter(charId)
      .then(console.log(char))
      .then(onCharLoaded)
}

const onCharLoaded = (char) => {
  setChar(char);
}

const errorMsg = error ? <ErrorMessage></ErrorMessage> : null;
const loadingSpinner = loading ? <Spinner></Spinner> : null;
const charContent = !(loading || error || !char) ? <View char={char}></View> : null;

    return (
      <>
        {errorMsg}
        {loadingSpinner}
        {charContent}
      </>
    )
}


const View = ({char}) => {
  const {name, description, thumbnail} = char;

  return (
    <div className="single-char">
      <img src={thumbnail} alt={name} className="single-char__img"/>
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
    </div>
  )
}
export default SingleCharPage;