import React from 'react';

//crear una funcion con reacthook
function UseState({ name }) {
    const [error, setError] = React.useState(true); //crear un estado de error//
    const [loading, setLoading] = React.useState(false); //crear un estado de cargando (empieza en false)//

    React.useEffect(() => { //queremos que luego de presionar el botón se muestre el mensaje cargando y despues de un tiempo que lo
      //borre de la pantalla (que vuelva a ser false)
      console.log("Empezando el efecto")
 
      if (!!loading) { //si loading es true
        setTimeout(() => {
          console.log("Haciendo la validación")
 
          setLoading(false);  //que vuelva a ser false después de los 3 segundos
 
          console.log("terminando la validación")
        }, 3000); //que espere 3 segundos 
      }
 
      console.log("Terminando el efecto")
    }, [loading]); //que se ejecute cuando cambie el estado cargando (es decir cuando se presione el boton de comprobar)

   return (
     <div>
       <h2>Eliminar {name}</h2>

       <p>Por favor, escribe el código de seguridad.</p>

       {error && (
         <p>Error: el código es incorrecto</p>
       )}

       {loading && (
         <p>Cargando...</p>
       )}

       <input placeholder="Código de seguridad" />
        <button
          onClick={() => setLoading(true)} //si se presiona el botón de comprobar muestra en pantalla cargando
       >Comprobar</button>
     </div>
   );
 }

 export { UseState };