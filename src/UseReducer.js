import React from 'react';

 const SECURITY_CODE = 'paradigma'; //contraseña

 function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () => dispatch({ type: actionTypes.reset });
 
    const onWrite = ({ target: { value } }) => {
      dispatch({ type: actionTypes.write, payload: value });
    }
 
    React.useEffect(() => {
        console.log("Empezando el efecto")
   
        if (!!state.loading) { //cargando verdadero
          setTimeout(() => {
            console.log("Haciendo la validación")
   
            if (state.value === SECURITY_CODE) { //verificando código
                onConfirm(); // código correcto
            } else { 
                onError(); //código incorrecto
            }
   
            console.log("terminando la validación")
          }, 3000); //3 segundos (loading)
        }
   
        console.log("Terminando el efecto")
      }, [state.loading]);
   
      if (!state.deleted && !state.confirmed) { //deleted y confirmed en falso
        return (
          <div>
            <h2>Eliminar {name}</h2>
   
            <p>Por favor, escribe el código de seguridad.</p>
   
            {(state.error && !state.loading) && ( //error verdadero y loading falso
              <p>Error: el código es incorrecto</p> //código incorrecto
            )}
            {state.loading && ( //cargando
              <p>Cargando...</p>
            )}
   
            <input
              placeholder="Código de seguridad"
              value={state.value} //código escrito por usuario
              onChange={onWrite}
            />
            <button //botón para confirmar
              onClick={onCheck}>
              Comprobar
            </button>
            </div>
        );
      } else if (!!state.confirmed && !state.deleted) { // estado confirmado en verdader y deleted en falso
        return (
          <React.Fragment>
            <p>Pedimos confirmación. ¿Tas segurx?</p> {/*pregunta para eliminar*/}
   
            <button //botón para eliminar
              onClick={onDelete}>
              Sí, eliminar
            </button>
            <button //botón de no eliminar
              onClick={onReset}>
              Nop, me arrepentí
            </button>
          </React.Fragment>
        );
       } else {
        return (
            <React.Fragment>
              <p>Eliminado con éxito</p>
  
              <button //botón para reseatear y volver al inicio
          onClick={onReset}>
           Resetear, volver atrás
         </button>
       </React.Fragment>
     );
   }
 }

 const initialState = { //estado inicial
    value: '',
   error: false,
   loading: false,
   deleted: false,
   confirmed: false,
 };
 
 const actionTypes = { //objeto con el nombre de las variables
    confirm: 'CONFIRM',
    delete: 'DELETE',
    error: 'ERROR',
    write: 'WRITE',
    reset: 'RESET',
  };

 const reducerObject = (state, payload) => ({
     [actionTypes.confirm]: { //confirmación
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionTypes.error]: { //error
      ...state,
      error: true,
      loading: false,
    },
    [actionTypes.write]: {//nuevo código escrito por usuario
      ...state,
      value: payload
    },
    [actionTypes.check]: {//cargando
      ...state,
      loading: true,
    },
    [actionTypes.delete]: {//borrar
      ...state,
      deleted: true,
    },
    [actionTypes.reset]: {//resetear y volver al inicio
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    },
  });
 
  const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
      return reducerObject(state, action.payload)[action.type];
    } else {
      return state;
    }
  };
 
  export { UseReducer };