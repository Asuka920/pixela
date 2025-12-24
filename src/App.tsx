// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkDetail from './pages/WorkDetail';
import CreatorProfile from './pages/CreatorProfile';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import MyPage from './pages/MyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import MembersPage from './pages/MembersPage';
import HelpPage from './pages/HelpPage';
import EditWorkListPage from './pages/EditWorkListPage';
import EditWorkPage from './pages/EditWorkPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <DataProvider> {/* AuthProviderの内側、Routesの外側に配置 */}
      <Header />
      <main className="main-content">
        <Routes>
          {/* script.jsのハッシュルーティングをpathベースに置き換え */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find-works" element={<SearchPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/edit-works" element={<EditWorkListPage />} />
          <Route path="/work/edit/:id" element={<EditWorkPage />} />
          <Route path="/profile/:userId" element={<CreatorProfile />} />

          {/* 元の #home に相当 */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </DataProvider>
  );
}

export default App;