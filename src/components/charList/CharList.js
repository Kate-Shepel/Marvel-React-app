import {useState, useEffect, useRef, createRef} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        getAllCharacters()
            .then(onFirstCharListLoaded)
    }, [])

    const onRequest = () => {
        setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onFirstCharListLoaded = (firstCharList) => {
        setCharList(charList => firstCharList);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const cardRefs = useRef([]);

    const focusOnCard = (id) => {
        cardRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        cardRefs.current[id].classList.add('char__item_selected');
        cardRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            if (!cardRefs.current[i]) {
                cardRefs.current[i] = createRef();
            }

            return (
                <CSSTransition nodeRef={cardRefs.current[i]} classNames="char__item" timeout={500} key={item.id}>
                    <li 
                        className="char__item"
                        tabIndex={0}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnCard(i);
                        }}
                        ref={el => cardRefs.current[i] = el}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnCard(i);
                            }
                        }}
                        >
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMsg = error ? <ErrorMessage/> : null;
    const loadingSpinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMsg}
            {loadingSpinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;