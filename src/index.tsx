import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log('On n\'imagine pas ce qui est à faire dans la chambre où un homme n\'a pas pénétré depuis vingt ans. Vous démêlerez la chainette de la jalousie, je pourrai enfin la lever, et voir clair en plein jour. Vous desencadrerez la glace de l\'armoire pour enlever l\'image de cette horreur qui m\'y regarde. Vous désamorcerez la souricière, elle est trop dure pour moi, et je n\'ai pu enlever la souris... Il y a aussi quelques mouches à tuer.');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);