import './App.css';
import { Route,Routes } from 'react-router';
import {Auth} from './routes/auth'
import { CreateCommunity } from './routes/createCommunity';
import { SetUpCommunity } from './routes/setupComminity';
import {CommunityHomePage} from './routes/communityHomePage';
import './index.css'
import SignUpPage from './components/signUpPage/signUpPage';




function App() {
 
  
   //<SignInPage />
   <SignUpPage />
  
  //<SetuCommunity />
  return (
    <Routes>
    <Route path='/auth' element={<Auth/>} />
    <Route path='/create-community' element={<CreateCommunity />}/>
    <Route path='/setup-community' element={<SetUpCommunity />}/>
    <Route path='/community/test-community' element={<CommunityHomePage />} />
    </Routes>
   
  )
}

export default App
