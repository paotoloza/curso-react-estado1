import React from 'react';

 const SECURITY_CODE = 'paradigma';

 function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
 
    React.useEffect(() => {
        console.log("Empezando el efecto")
   
        if (!!state.loading) { //cargando verdadero
          setTimeout(() => {
            console.log("Haciendo la validación")
   
            if (state.value === SECURITY_CODE) { //verificando código
              dispatch({ type: 'CONFIRM' }); // código correcto
            } else { 
              dispatch({ type: 'ERROR' }); //código incorrecto
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
              onChange={(event) => {
                dispatch({ type: 'WRITE', payload: event.target.value });
                // onWrite(event.target.value);
              }}
            />
            <button //botón para confirmar
              onClick={() => {
                dispatch({ type: 'CHECK' });
                // onCheck();
              }}
            >Comprobar</button>
          </div>
        );
      } else if (!!state.confirmed && !state.deleted) { // estado confirmado en verdader y deleted en falso
        return (
          <React.Fragment>
            <p>Pedimos confirmación. ¿Tas segurx?</p> {/*pregunta para eliminar*/}
   
            <button //botón para eliminar
              onClick={() => {
                dispatch({ type: 'DELETE' });
                // onDelete();
              }}
            >
              Sí, eliminar
            </button>
            <button //botón de no eliminar
              onClick={() => {
                dispatch({ type: 'RESET' });
                // onReset();
              }}
            >
              Nop, me arrepentí
            </button>
          </React.Fragment>
        );
       } else {
        return (
            <React.Fragment>
              <p>Eliminado con éxito</p>
  
              <button //botón para reseatear y volver al inicio
           onClick={() => {
             dispatch({ type: 'RESET' });
             // onReset();
           }}
         >
           Resetear, volver atrás
         </button>
       </React.Fragment>
     );
   }
 }

 const initialState = { //estado inicial
   value: 'paradigma',
   error: false,
   loading: false,
   deleted: false,
   confirmed: false,
 };
 
 const reducerObject = (state, payload) => ({
    'CONFIRM': { //confirmación
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    'ERROR': { //error
      ...state,
      error: true,
      loading: false,
    },
    'WRITE': { //nuevo código escrito por usuario
      ...state,
      value: payload
    },
    'CHECK': { //cargando
      ...state,
      loading: true,
    },
    'DELETE': { //borrar
      ...state,
      deleted: true,
    },
    'RESET': { //resetear y volver al inicio
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