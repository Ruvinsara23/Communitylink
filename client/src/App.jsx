import './App.css';
import { Route, Routes } from 'react-router';
import { Auth } from './routes/auth';
import { CreateCommunity } from './routes/createCommunity';
import { SetUpCommunity } from './routes/setupComminity';
import { CommunityHomePage } from './routes/communityHomePage';
import ChatInterface from './routes/chat';
import './index.css';
import SignUpPage from './components/signUpPage/signUpPage';
import Home from './routes/home';
import EventPage from './routes/event';
import PollingPage from './routes/poll';
import { DashboardShell } from './components/dashboardSell/dashboardShell';
import MembersPage from './routes/communityMember';
import Navbar from './components/navbar/navbar';
import MembePagrse from './routes/communityMember';
import CommunityProfile from './routes/communityProfile';

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/create-community" element={<CreateCommunity />} />
      <Route path="/setup-community" element={<SetUpCommunity />} />

      {/* Community Routes */}
      <Route path="/community" element={<Navbar />}>
          {/* Nested routes */}
          <Route path=":communitySlug" element={<CommunityHomePage />} />
          <Route path=":communitySlug/chat" element={<ChatInterface />} />
          <Route path=":communitySlug/members" element={<MembersPage />} />
          <Route path=":communitySlug/about" element={<CommunityProfile />} />
        </Route>

      {/* Dashboard */}
      <Route path="/" element={<DashboardShell />}>
        <Route index element={<Home />} />
        <Route path="poll" element={<PollingPage />} />
        <Route path="events" element={<EventPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="chat" element={<ChatInterface />} />
      </Route>
    </Routes>
  );
}

export default App;
