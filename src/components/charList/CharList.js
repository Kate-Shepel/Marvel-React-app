import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onFirstCharListLoaded)
            .catch(this.onError)
    }

    onRequest = (offset = this.state.offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onFirstCharListLoaded = (firstCharList) => {
        this.setState(({offset}) => ({
            charList: firstCharList,
            loading: false, 
            newItemLoading: false,
            offset: offset + 9
        }))
    }

    onCharListLoaded = (newCharList) => {
        let ended = this.state.charEnded;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false, 
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    cardRefs = [];

    setCardRef = card => {
        this.cardRefs.push(card);
        console.log(this.cardRefs, 'cardRefs');
    }

    focusOnCard = (id) => {
        this.cardRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.cardRefs[id].classList.add('char__item_selected');
        this.cardRefs[id].focus();
    }

    renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li 
                    className="char__item"
                    key={item.id}
                    tabIndex={0}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnCard(i);
                    }}
                    ref={this.setCardRef}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnCard(i);
                        }
                    }}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMsg = error ? <ErrorMessage/> : null;
        const loadingSpinner = loading ? <Spinner/> : null;
        const charListContent = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMsg}
                {loadingSpinner}
                {charListContent}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;