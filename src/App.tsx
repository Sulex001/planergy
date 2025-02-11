import './App.css'
import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/main/Home';
import GetStarted from './pages/onboarding/GetStarted';
import PersonalInformation from './pages/onboarding/PersonalInformation';
import RoleSelection from './pages/onboarding/Role';
import Company from './pages/onboarding/Company';
import Summary from './pages/onboarding/Summary';
import { useAuthContext } from './hooks/UseAuthContext';
import Login from './pages/login/Login';
import { Navigate } from 'react-router-dom';
import Dashboard from './pages/main/Dashboard';
import { User } from './contexts/AuthContext';
import Project from './pages/main/Project';
import MyTask from './pages/main/myTask';
import Teams from './pages/main/Teams';
import Calender from './pages/main/Calender';
import Documents from './pages/main/Documents';
import Settings from './pages/main/Settings';
import Supports from './pages/main/Supports';

function App() {
  const { state } = useAuthContext()
 const user = state.userDetails.user


  
  return (
    <>
      <div className='w-full h-screen p-2'>
      
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/get_started' element={<GetStarted/>} />
        <Route path='/personal_information' element={<PersonalInformation/>} />
         <Route path='/role_selection' element={<RoleSelection/> } /> 
         <Route path='/company_selection' element={ <Company/> } /> 
         <Route path='/summary' element={ <Summary/> } /> 
         <Route path='/login' element={!user  ? <Login/> : <Navigate to='/dashboard' replace />} />
        {/* <Route path='*' element={!user ? <LandingPage/> : <Navigate to='/dashboard' replace />} />
       <Route path='/reset_password' element={<ResetPassword/> } />
        <Route path='/email_verification' element={<EmailVerification/> } /> */}
        <Route path='/dashboard' element= { user as User ?  <Dashboard/> : <Navigate to= '/login' replace /> }/>
        <Route path='/projects' element={ user as User ? <Project/> : <Navigate to='/login' replace />} />
        <Route path='/tasks' element={ user as User ? <MyTask/> : <Navigate to='/login' replace />} />
        <Route path='/teams' element={ user as User ? <Teams/> : <Navigate to='/login' replace />} />
        <Route path='/calender' element={ user as User ? <Calender/> : <Navigate to='/login' replace />} />
        <Route path='/documents' element={ user as User ? <Documents/> : <Navigate to='/login' replace />} />
        <Route path='/settings' element={ user as User ? <Settings/> : <Navigate to='/login' replace />} />
        <Route path='/support' element={<Supports />} />
      </Routes>
    </BrowserRouter>
    </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  )
}

export default App
