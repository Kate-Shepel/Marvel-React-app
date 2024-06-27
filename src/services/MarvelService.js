import {useHttp} from '../components/hooks/http.hook';

const useMarvelService = () => {

  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=d7ce082292719cff8a09876dac78c098';
  const _baseOffset = 210;
  const _baseComicsOffset = 200;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getCharByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
  }

  const getComics = async (offset = _baseComicsOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics)
  }

  const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 190)}...` : 'There is no description about this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items.length < 10 ? char.comics.items : char.comics.items.slice(0, 10)
    }
  }

  const _transformComics = (comics_item) => {
    return {
      id: comics_item.id,
      title: comics_item.title,
      description: comics_item.description || "There is no description",
			pageCount: comics_item.pageCount
				? `${comics_item.pageCount} p.`
				: "No information about the number of pages",
      thumbnail: comics_item.thumbnail.path + '.' + comics_item.thumbnail.extension,
      language: comics_item.textObjects[0]?.language || "en-us",
      price: comics_item.prices[0].price <= 0 ? 'NOT AVAILABLE' : `${comics_item.prices[0].price}$`
    }
  }

  return {loading, error, getAllCharacters, getCharacter, getCharByName, clearError, getComics, getComic}
}

export default useMarvelService;