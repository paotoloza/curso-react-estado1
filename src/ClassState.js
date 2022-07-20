import React from 'react';

//crear un componente de tipo clase
 class ClassState extends React.Component { //ClassState hereda todo lo que trae React.Component
   render() {
     return (
       <div>
         <h2>Eliminar ClassState</h2>

         <p>Por favor, escribe el código de seguridad.</p>

         <input placeholder="Código de seguridad" />
         <button>Comprobar</button>
       </div>
     );
   }
 }

 export { ClassState };