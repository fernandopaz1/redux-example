import axios from 'axios';

// constantes
// aca se guardan la informacion de los pokemones
const dataInicial = {
    array: []
}

// defino los types de las actions con constantes
const OBTNENER_POKEMONES_EXITO = 'OBTNENER_POKEMONES_EXITO'
const ELIMINAR_POKEMONES_EXITO = 'ELIMINAR_POKEMONES_EXITO'

// reducer 
// el reducer segun las acciones que se ejecuten toma la informacion
// y lo envia a las constante(estado)
// se recomienda que el estado inicial que toma el reducer sea 
// dataInicial
export default function pokesReducer(state = dataInicial, action){
    // si es exitoso devuelvo los que estaban en el estado
    // y hago append de los que me mandan en el payload
    switch(action.type){
        case OBTNENER_POKEMONES_EXITO:
            return {...state, array: action.payload}
        case ELIMINAR_POKEMONES_EXITO:
            return {array: []}
        default:
            return state

    }
}

// acciones
// las acciones son las funciones que acceden a la store
// con dispatch vamos a activar el reducer y con getState accedemos a la data
// si la llamada asincrona a la api da bien
// llama al reducer con el tipo de accion exitoso
// y le paso lo que obtuvimos de la api
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({type: OBTNENER_POKEMONES_EXITO,
                payload: res.data.results})
    } catch (error) {
        console.log(error)
    }
}

export const eliminarPokemonesAccion = () => async (dispatch, getState) => {
    try {
        dispatch({type: ELIMINAR_POKEMONES_EXITO})
    } catch (error) {
        console.log(error)
    }
}