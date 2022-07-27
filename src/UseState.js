import React from 'react';

const SECURITY_CODE = 'paradigma';

//crear una funcion con reacthook
function UseState({ name }) {
    const [value, setValue] = React.useState(''); //crear un estado dinamico (lo que los usuarios escriban en el código de seguridad)
    const [error, setError] = React.useState(false); //crear un estado de error//
    const [loading, setLoading] = React.useState(false); //crear un estado de cargando (empieza en false)//

    console.log(value) 

    React.useEffect(() => { //queremos que luego de presionar el botón se muestre el mensaje cargando y despues de un tiempo que lo
      //borre de la pantalla (que vuelva a ser false)
      console.log("Empezando el efecto")
 
      if (!!loading) { //si loading es true
        setTimeout(() => {
          console.log("Haciendo la validación")
 
          // setLoading(false);  //que vuelva a ser false después de los 3 segundos

          if (value === SECURITY_CODE) {  //si lo que escribio el usuario es igual al codigo de seguridad (SECURITY_CODE)
            setLoading(false); //el estado de carga se vuelve falso porque ya se termino de cargar
            // setError(false); //una forma de poner error en falso mientras carga (luego de equivocarse de clave)
         } else { // sino
           setError(true);  //error (código incorrecto)
           setLoading(false);//el estado de carga se vuelve falso porque ya se termino de cargar
         }
          console.log("terminando la validación")
        }, 3000); //que espere 3 segundos 
      }
 
      console.log("Terminando el efecto")
    }, [loading]); //que se ejecute cuando cambie el estado cargando (es decir cuando se presione el boton de comprobar)

   return (
     <div>
       <h2>Eliminar {name}</h2>

       <p>Por favor, escribe el código de seguridad.</p>

       {(error && !loading) && (  //una forma de poner error en falso mientras carga (luego de equivocarse de clave)
         <p>Error: el código es incorrecto</p>
       )}

       {loading && (
         <p>Cargando...</p>
       )}

       {/* <input placeholder="Código de seguridad" /> */}
       <input
         placeholder="Código de seguridad" 
         value={value} //lo que escriba el usuario
         onChange={(event) => { 
           setValue(event.target.value); //recibir lo que escribio el usuario (en el estado)
         }}
       />
        <button
          onClick={() => {
            setLoading(true); //si se presiona el botón de comprobar muestra en pantalla cargando
          //setError(false); //una forma de poner error en falso mientras carga (luego de equivocarse de clave)
        }}
       >Comprobar
       </button>
     </div>
   );
 }

 export { UseState };