import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Players from './pages/Players';
import Transfers from './pages/Transfers';
import UserProvider from './context/userContext';
import FixedMenu from './components/FixedMenu';
import LanguageSwitcher from './components/LanguageSwitcher';
import ScrollToTop from './components/ScrollToTop';


// Import blog pages
import ErrorPage from './blog/ErrorPage';
import PostDetail from './blog/PostDetail';
import Register from './blog/Register';
import Login from './blog/Login';
import UserProfile from './blog/UserProfile';
import Authors from './blog/Authors';
import CreatePost from './blog/CreatePost';
import EditPost from './blog/EditPost';
import DeletePost from './blog/DeletePost';
import CategoryPosts from './blog/CategoryPosts';
import AuthorPosts from './blog/AuthorPosts';
import Dashboard from './blog/Dashboard';
import Logout from './blog/Logout';
import Posts from './components/Posts';

// Import player pages
import PlayerPosts from './players/PlayerPosts'; // Import PlayerPosts
import CreatePlayer from './players/CreatePlayer';  // Import CreatePlayer
import EditPlayer from './players/EditPlayer';  // Import EditPlayer
import DeletePlayer from './players/DeletePlayer';  // Import DeletePlayer
import PlayerDetail from './players/PlayerDetail';  // Import PlayerDetail
import DashboardPlayers from './players/DashboardPlayers';  // Import DashboardPlayers

// Import transfer pages
import CreateTransfer from './transfers/CreateTransfer';
import EditTransfer from './transfers/EditTransfer';
import DeleteTransfer from './transfers/DeleteTransfer';
import DashboardTransfer from './transfers/DashboardTransfer';

const App = () => {
  const location = useLocation();

  const getBackgroundClass = (pathname) => {
    switch (pathname) {
      case '/':
        return 'home-background';
      case '/about':
        return 'about-background';
      case '/services':
        return 'services-background';
      case '/blog':
        return 'blog-background';
      case '/contact':
        return 'contact-background';
      case '/players':
        return 'players-background';
      case '/transfers':
        return 'transfers-background';
      default:
        return 'other-background';
    }
  };

  

  return (
    <div className={`App ${getBackgroundClass(location.pathname)}`}>
      <LoadingScreen />
      <ScrollToTop />
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/players" element={<Players />} /> {/* Link to PlayerPosts */}
          <Route path="/transfers" element={<Transfers />} />

          {/* Blog routes */}
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="authors" element={<Authors />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:categories/:category" element={<CategoryPosts />} />
          <Route path="posts/users/:id" element={<AuthorPosts />} />
          <Route path="myposts/:id" element={<Dashboard />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="posts/:id/delete" element={<DeletePost />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Player routes */}
          <Route path="/players/create" element={<CreatePlayer />} /> {/* Link to CreatePlayer */}
          <Route path="/players/:id/edit" element={<EditPlayer />} /> {/* Link to EditPlayer */}
          <Route path="/players/:id/delete" element={<DeletePlayer />} /> {/* Link to DeletePlayer */}
          <Route path="/players/:id" element={<PlayerDetail />} /> {/* Link to PlayerDetail */}
          <Route path="/players/dashboard" element={<DashboardPlayers />} /> {/* Link to DashboardPlayers */}
          <Route path="/players/posts" element={<PlayerPosts />} />



          {/* Transfer routes */}
          <Route path="transfers/create" element={<CreateTransfer />} />
          <Route path="transfers/:id/edit" element={<EditTransfer />} />
          <Route path="transfers/:id/delete" element={<DeleteTransfer />} />
          <Route path="transfers/dashboard" element={<DashboardTransfer />} />
        </Routes>
      </div>
      <FixedMenu />
      <LanguageSwitcher />
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  );
}
