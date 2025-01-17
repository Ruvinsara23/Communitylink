import './App.css';
import { Route,Routes } from 'react-router';
import {Auth} from './routes/auth'
import { CreateCommunity } from './routes/createCommunity';
import { SetUpCommunity } from './routes/setupComminity';
import {CommunityHomePage} from './routes/communityHomePage';
import ChatInterface from './routes/chat';
import './index.css'
import SignUpPage from './components/signUpPage/signUpPage';
import Home from './routes/home';
import EventPage from './routes/event';
import { DashboardNav } from './components/dashboardNav/dashboardNav';
import { DashboardShell } from './components/dashboardSell/dashboardShell';
import { DashboardHeader } from './components/dashboardHeader/dashboardHeader';
import MembersPage from './routes/communityMember';



function App() {
 
  
   //<SignInPage />
  //  <SignUpPage />
  
  //<SetuCommunity />
  return (
    <Routes>
    
    <Route path='/auth' element={<Auth/>} />
    <Route path='/create-community' element={<CreateCommunity />}/>
    <Route path='/setup-community' element={<SetUpCommunity />}/>
    <Route path='/community/test-community' element={<CommunityHomePage />} />
    <Route path='/community-home' element={<CommunityHomePage />} >
    <Route path='chat' element={<ChatInterface />} />
    </Route>

    <Route path='/' element={<DashboardShell />} >
   
    <Route index element={<Home />} />
    <Route path="events" element={<EventPage />} />
    <Route path="members" element={<MembersPage />} />
   
    </Route>
    </Routes>
   
  )
}

export default App
