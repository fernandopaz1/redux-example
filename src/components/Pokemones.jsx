import React from 'react';

// useDispatch nos sirve para consumir las acciones
// y useSelector para acceder a los datos de la store
import { useDispatch, useSelector } from 'react-redux';

// importamos las acciones que queremos usar
import { obtenerPokemonesAccion } from '../redux/pokeDucks'

const Pokemones = () => {

    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.array)

    return (
        <div>
            Lista de pokemones <button onClick={()=> {dispatch(obtenerPokemonesAccion())}}> Obtener Pokemones</button>
            {pokemones.length > 0 ?  (<ul>
                { pokemones.map(item => (<li key={item.name}>{item.name}</li>))}
            </ul>): <div/>}
        </div>
    )
}

export default Pokemones;