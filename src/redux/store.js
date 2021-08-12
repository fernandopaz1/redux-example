import axios from 'axios';

// constantes
// aca se guardan la informacion de los pokemones
const dataInicial = {
    array: [],
}

// defino los types de las actions con constantes
const OBTNENER_POKEMONES_EXITO = 'OBTNENER_POKEMONES_EXITO'

// reducer 
// el reducer segun las acciones que se ejecuten toma la informacion
// y lo envia a las constante(estado)
// se recomienda que el estado inicial que toma el reducer sea 
// dataInicial
export default function pokeReducer(state= dataInicial, action){
    switch(action.type){
        // si es exitoso devuelvo los que estaban en el estado
        // y hago append de los que me mandan en el payload
        case OBTNENER_POKEMONES_EXITO:
            return {...state, array: action.payload}

    }
}

// acciones
// las acciones son las funciones que acceden a la store
export const obtenerPokemonesAccion = () => {
    // con dispatch vamos a activar el reducer y con getState accedemos a la data
    async (dispatch, getState) => {
        try {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
            // si la llamada asincrona a la api da bien
            // llama al reducer con el tipo de accion exitoso
            // y le paso lo que obtuvimos de la api
            dispatch({type: OBTNENER_POKEMONES_EXITO,
                    payload: res.data.results})
        } catch (error) {
            console.log(error)
        }
    }
}