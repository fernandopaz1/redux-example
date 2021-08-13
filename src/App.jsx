import React from 'react';
import Pokemones from './components/Pokemones'

// este provider es para compartir informacion
import {Provider} from 'react-redux' 
import generateStore from './redux/store'

function App() {
  const store = generateStore()
  return (
    <Provider store={store}>
      <Pokemones />
    </Provider>
  );
}

export default App;
