import axios from 'axios';

// constantes
// aca se guardan la informacion de los pokemones
const dataInicial = {
    array: [],
    offset: 0,
    limit: 20,
    pagina: 0,
}

// defino los types de las actions con constantes
const OBTNENER_POKEMONES_EXITO = 'OBTNENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'
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
            return {array: [], offset: 0, pagina: 0, limit: 20}
        case SIGUIENTE_POKEMONES_EXITO:
            return {array: action.payload.array, offset: action.payload.offset, pagina: action.payload.pagina, limit: 20 }
        case ANTERIOR_POKEMONES_EXITO:
            return {array: action.payload.array, offset: action.payload.offset,pagina: action.payload.pagina, limit: 20}
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
    const offset = getState().pokemones.offset
    const limit = getState().pokemones.limit
    
    const siguiente = offset + limit
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${siguiente}`)
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

export const siguientePokemonAccion = () => async (dispatch, getState) => {
    // const offset = getState().pokemones.offset
    const limit = getState().pokemones.limit
    const pagina = getState().pokemones.pagina
    const offset = pagina*limit
    const siguiente = offset + limit
    console.log(`Offset ${offset}`)
    console.log(`siguiente ${siguiente}`)
    console.log(`limit ${limit}`)
    console.log(`pagina ${pagina}`)
    console.log( `url : https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        dispatch({type: SIGUIENTE_POKEMONES_EXITO,
            payload: {array: res.data.results, offset: siguiente,  pagina: pagina+1}})
    } catch (error) {
        console.error(error)
    }
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {
    // const offset = getState().pokemones.offset
    const limit = getState().pokemones.limit
    const pagina = getState().pokemones.pagina
    const nextPage = pagina === 0 ? 0 : pagina - 1
    const offset = limit*(pagina-1)
    const siguiente = offset + limit
    console.log(`Offset ${offset}`)
    console.log(`siguiente ${siguiente}`)
    console.log(`limit ${limit}`)
    console.log(`pagina ${pagina}`)
    console.log( `url : https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        dispatch({type: ANTERIOR_POKEMONES_EXITO,
            payload: {array: res.data.results, offset: siguiente,  pagina: nextPage}})
    } catch (error) {
        console.error(error)
    }
}