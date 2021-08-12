import React from 'react';

// useDispatch nos sirve para consumir las acciones
// y useSelector para acceder a los datos de la store
import { useDispatch, useSelector } from 'react-redux';

// importamos las acciones que queremos usar
import { obtenerPokemonesAccion } from '../redux/pokeDucks'

const Pokemones = () => {

    const dispatch = useDispatch();

    return (
        <div onClick={()=> {dispatch(obtenerPokemonesAccion())}}>
            Lista de pokemones

        </div>
    )
}

export default Pokemones;