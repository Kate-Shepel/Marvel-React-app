import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/app/App";

import MarvelService from "./services/MarvelService";

import "./style/style.scss";

const marvelService = new MarvelService();

marvelService.getCharacter(1010338).then((res) => console.log(res));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App></App>
  </StrictMode>
);
