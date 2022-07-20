import React from 'react';

//crear un componente de tipo clase
 class ClassState extends React.Component { //ClassState hereda todo lo que trae React.Component
    constructor(props) {
        super(props); //permite ir actializando el estado
   
        this.state = { //crear un estado//
          error: true,
        };
      }
   
   render() {
     return (
       <div>
          <h2>Eliminar {this.props.name}</h2>

         <p>Por favor, escribe el código de seguridad.</p>

         {this.state.error && (
           <p>Error: el código es incorrecto</p>
         )}

         <input placeholder="Código de seguridad" />
         <button
           onClick={() =>
             this.setState(prevState => ({ error: !prevState.error })) //si se presiona el botón error pasa a ser false (no se ve en pantalla error)
           }
         >Comprobar</button>
       </div>
     );
   }
 }

 export { ClassState };