/* this folder is created to create react-context 
-  to handle state through out application only for specific component
- we will create chamge theme button
- Store.ts is renamed by Store.tsx becz we have to return jsx element*/
import React,{useReducer} from "react"



 {/*we have define type of AppState which is an object which has mode which has property string*/}

type AppState = {
 mode: string
}

{/* to initial state of AppState type*/ }
const initialState: AppState = {
  mode: localStorage.getItem('mode')//if localstorage exist then use that mode if not
  ? localStorage.getItem('mode')!
  : window.matchMedia && window.matchMedia('(prefers-color-schema: dark)').matches
  ? 'dark'
  : 'light',
  //check web-browser for that theme if selected theme by user is dark then set them as dark otherwise light
}

/* we need reducer to create redux content*/
/* using action type in reducer to set actions */
type Action = { type: 'SWITCH_MODE'}
/* parameters are state and action,it take state and below return value of reducer is AppState */

function reducer(state: AppState,action:Action): AppState
  {
    switch (action.type){
      case 'SWITCH_MODE': //if action is SWITCH_MODE then user want to change the theme
        return {mode: state.mode === 'dark' ? 'light' : 'dark'}//here it is returning object if initial state is dark then change to light otherwise dark
      default:
        return state //if not SWITCH_MODE return previous state
    }
  }

/*defaultDispatch return arrow function to set default theme when we initially run the application */
const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

//define fn StoreProvider which takes props it takes two paramaters state and to change state -  dispatch
function StoreProvider(props: React.PropsWithChildren<object>){
  const [state, dispatch] = useReducer(reducer, initialState)
  
//return context from Store is used here and provide property of store to wrap whole application inside the provider to provide these values state and dispatch from useReducer 
//...props means I am keeping other properties as they are
return <Store.Provider value={{state,dispatch}} {...props} />
}
export {Store,StoreProvider}