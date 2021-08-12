// la idea es que la store es como index.js
// no es un arcchivo que tocamos, solo lo configuramos incialmente
// y le vamos agrengado cosas des de los Ducks

import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// lo que importamos de los duck son los reducers que
import pokesReducer from './pokesDucks'

// aca conmbinamos todos los reducers 
const rootReducer = combineReducers({
    // en nuestros componenetes llamamos a los reducers con 
    // el nombre qde aca abajo
    pokemones: pokesReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}