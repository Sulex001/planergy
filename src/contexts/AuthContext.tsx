import { createContext, useReducer,ReactNode, useEffect,} from "react";

export interface UserCredentials {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  companyId: string;
  role: string;
  phoneNumber: string;
  username: string;
  online: boolean;
}
export interface User {
token: null| string ;
user: UserCredentials
}


export type UserDetails = {
  user: User | null;
  authIsReady: boolean;
}


const initialUserDetails: UserDetails = {
  user: null,
  authIsReady: false,
}

type State = {
  userDetails: UserDetails;
}

type Action =
  | { type: 'SIGN_IN'; payload: UserDetails }
  | { type: 'SIGN_OUT'; payload: UserDetails }
  | { type: 'AUTH_IS_READY'; payload: UserDetails }

export type UserDetailsContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const AuthContext = createContext<UserDetailsContextType | undefined>(undefined);


const AuthReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SIGN_IN':
      return {...state, userDetails: { ...state.userDetails, user: action.payload.user, authIsReady: true} }
    case 'SIGN_OUT':
      return {...state, userDetails: { ...state.userDetails, user: null, authIsReady: false } }
    case 'AUTH_IS_READY':
      return {...state, userDetails: { ...state.userDetails, authIsReady: action.payload.authIsReady, user: action.payload.user } }
    default:
      return state;
  }
}


export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { userDetails: initialUserDetails } as State)

  useEffect(() => {
    const unsubscribe = () => {
      const user = localStorage.getItem('user')
      const userDetails : UserDetails = {
        user: user ? JSON.parse(user) : null,
        authIsReady: true,
      }
      dispatch({ type: 'AUTH_IS_READY', payload: userDetails })
    }
    
 
    return unsubscribe
  }, [])
  
  console.log(state)
  return (
    <AuthContext.Provider value={{ state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
