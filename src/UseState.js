import React from 'react';

//crear una funcion con reacthook
function UseState({ name }) {
    const [error, setError] = React.useState(true); //crear un estado//
 
   return (
     <div>
       <h2>Eliminar {name}</h2>

       <p>Por favor, escribe el código de seguridad.</p>

       {error && (
         <p>Error: el código es incorrecto</p>
       )}

       <input placeholder="Código de seguridad" />
        <button
         onClick={() => setError(!error)} //si se presiona el botón error pasa a ser false (no se ve en pantalla error)
       >Comprobar</button>
     </div>
   );
 }

 export { UseState };