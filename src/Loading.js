import React from 'react';

 class Loading extends React.Component {
   componentWillUnmount() { //se ejecuta antes de renderizar
     console.log("componentWillUnmount") //muestra en la consola "componentWillUnmount"
   }

   render() {
     return ( //muestra un parráfo que diga cargando
       <p>Cargando...</p>
     );
   }
 }

 export { Loading };