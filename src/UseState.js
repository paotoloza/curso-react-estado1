import React from 'react';

const SECURITY_CODE = 'paradigma';

//crear una funcion con reacthook
function UseState({ name }) {

   //estados simples
    // const [value, setValue] = React.useState(''); //crear un estado dinamico (lo que los usuarios escriban en el código de seguridad)
    // const [error, setError] = React.useState(false); //crear un estado de error//
    // const [loading, setLoading] = React.useState(false); //crear un estado de cargando (empieza en false)//

   //estados compuestos
   const [state, setState] = React.useState({ //estados
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  const onConfirm = () => { //confirmación
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => { //error
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (newValue) => { //nuevo código escrito por usuario
    setState({
      ...state,
      value: newValue,
    });
  }

  const onCheck = () => { //cargando
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => { //borrar
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => { //resetear y volver al inicio
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    });
  };

    React.useEffect(() => { //queremos que luego de presionar el botón se muestre el mensaje cargando y despues de un tiempo que lo
      //borre de la pantalla (que vuelva a ser false)
      console.log("Empezando el efecto")
 
      // if (!!loading) { //si loading es true (para estado simple)
        if (!!state.loading) {
        setTimeout(() => {
          console.log("Haciendo la validación")
 
          // setLoading(false);  //que vuelva a ser false después de los 3 segundos
         
          //para estado simple
          // if (value === SECURITY_CODE) {  //si lo que escribio el usuario es igual al codigo de seguridad (SECURITY_CODE)
          //   setLoading(false); //el estado de carga se vuelve falso porque ya se termino de cargar
          //   // setError(false); //una forma de poner error en falso mientras carga (luego de equivocarse de clave)

          //para estado compuesto
            if (state.value === SECURITY_CODE) {
              onConfirm();

         } else { // sino
          //  setError(true);  //error (código incorrecto)
          //  setLoading(false);//el estado de carga se vuelve falso porque ya se termino de cargar

         onError();

         }
          console.log("terminando la validación")
        }, 3000); //que espere 3 segundos 
      }
 
      console.log("Terminando el efecto")
   // }, [loading]); //que se ejecute cuando cambie el estado cargando (es decir cuando se presione el boton de comprobar)
     }, [state.loading]);

     if (!state.deleted && !state.confirmed) { //si delete y confirmed son falsos
      return (
        <div>
          <h2>Eliminar {name}</h2> {/*pregunta si quieres eliminar*/}
 
          <p>Por favor, escribe el código de seguridad.</p> {/*solicita escribir el código de seguridad*/}
 
          {(state.error && !state.loading) && ( //error verdadero y estado cargando en falso
            <p>Error: el código es incorrecto</p> //código incorrecto
          )}
          {state.loading && ( //estado cargando en verdadero
            <p>Cargando...</p> //código correcto cargando
          )}
 
          <input
            placeholder="Código de seguridad"
            value={state.value} //código escrito por usuario
            onChange={(event) => {
              onWrite(event.target.value);
            }}
          />
          <button
            onClick={() => {
              onCheck();
            }}
          >Comprobar</button> {/*Botón para comprobar código*/}
        </div>
      );
    } else if (!!state.confirmed && !state.deleted) { //si confirmed es verdadero y delete es falso
      return (
        <React.Fragment>
          <p>Pedimos confirmación. ¿Tas segurx?</p> {/*Estado de confirmación*/}

       <button
           onClick={() => { //botón para eliminar 
            onDelete();
           }}
         >
           Sí, eliminar
         </button>
         <button //botón para no eliminar 
           onClick={() => {
            onReset();
           }}
         >
           Nop, me arrepentí
         </button>
       </React.Fragment>
     );
   } else { //si confirmed es verdadero y delete es verdadero
     return (
       <React.Fragment>
         <p>Eliminado con éxito</p>  {/*Eliminó con exito*/}

          <button //crea un botón para resetear y volver al inicio
           onClick={() => {
            onReset();
           }}
         >
           Resetear, volver atrás
         </button>
       </React.Fragment>
     );
   }
  }

 export { UseState };