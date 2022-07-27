import React from 'react';
import { Loading } from './Loading';

//crear un componente de tipo clase
 class ClassState extends React.Component { //ClassState hereda todo lo que trae React.Component
    constructor(props) {
        super(props); //permite ir actializando el estado
   
        this.state = { //crear un estado//
          error: true,
          loading: false,
        };
      }

       // componentWillMount() { //metodo del ciclo de vida
   // UNSAFE_componentWillMount() {
   //   console.log("componentWillMount")
   // }

   // componentDidMount() { //metodo del ciclo de vida
   //   console.log("componentDidMount")
   // }

   componentDidUpdate() {  //metodo del ciclo de vida que se ejecuta despues de renderizar
    console.log('actualizacion');

    if (!!this.state.loading) { //si el estado de loading es true
      setTimeout(() => {
        console.log("Haciendo la validación")

        this.setState({ loading: false }); //que vuelva a ser false el estado de loading después de los 3 segundos

        console.log("terminando la validación")
      }, 3000); // que espere 3 segundos
    }
  }
   
   render() {
     return (
       <div>
          <h2>Eliminar {this.props.name}</h2>

         <p>Por favor, escribe el código de seguridad.</p>

         {this.state.error && (
           <p>Error: el código es incorrecto</p>
         )}

         {this.state.loading && (
           <Loading /> //muestra lo que esta en Loading.js cada vez que actualicemos nuestro estado de carga (al presionar el botón comprobar)
         )}
 
         <input placeholder="Código de seguridad" />
         <button
          //  onClick={() =>
          //    this.setState(prevState => ({ error: !prevState.error })) //si se presiona el botón error pasa a ser false (no se ve en pantalla error)
          //  }
           onClick={() => this.setState({ loading: true })} //si se presiona el botón de comprobar muestra en pantalla cargando
         >Comprobar</button>
       </div>
     );
   }
 }

 export { ClassState };