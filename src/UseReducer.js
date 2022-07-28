const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  };
 
  // const reducer = (state, action) => {
  // };
 
  const reducerIf = (state, action) => { //usando if
    if (action.type === 'ERROR') { //si la accion es error
      return {
        ...state,
        error: true,
        loading: false,
      };
    } else if (action.type === 'CHECK') { //si la accion es cargando
      return {
        ...state,
        loading: true,
      };
    } else {
      return {
        ...state,
      };
    }
  };
 
  const reducerSwitch = (state, action) => { //usando switch
    switch (action.type) {
      case 'ERROR':
        return {
          ...state,
          error: true,
          loading: false,
        };
      case 'CHECK':
        return {
          ...state,
          loading: true,
        };
      default:
        return {
          ...state,
        };
    }
  };
 
  const reducerObject = (state) => ({ //usando reducerObject
    'ERROR': {
      ...state,
      error: true,
      loading: false,
    },
    'CHECK': {
      ...state,
      loading: true,
    },
  });
 
  const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
      return reducerObject(state)[action.type];
    } else {
      return state;
    }
  };