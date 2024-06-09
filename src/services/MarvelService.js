

class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=d7ce082292719cff8a09876dac78c098')
  }

  getCharacter = (id) => {
    return this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=d7ce082292719cff8a09876dac78c098`);
}

}

export default MarvelService;