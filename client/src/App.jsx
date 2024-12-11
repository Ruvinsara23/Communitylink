import './App.css';
import { Route,Routes } from 'react-router';
import {Auth} from './routes/auth'
import { CreateCommunity } from './routes/createCommunity';
import { SetUpCommunity } from './routes/setupComminity';
import {CommunityHomePage} from './routes/communityHomePage';
import './index.css'



function App() {
 
  
  // <SignInPage />
  // <SignUpPage />
  //
  // <SetuCommunity />
  return (
    <Routes>
    <Route path='/auth' element={<Auth/>} />
    <Route path='/create-community' element={<CreateCommunity />}/>
    <Route path='/setup-comunity' element={<SetUpCommunity />}/>
    <Route path='/community' element={<CommunityHomePage />} />
    </Routes>
   
  )
}

export default App
