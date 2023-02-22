import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, CreatePost } from "./pages";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserProfile from "./pages/UserProfile";
import Forbidden from "./pages/Forbidden";
import Navbar from "./components/Navbar";

const App = () => {
  const username = localStorage.getItem("username");

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />
            <Route
              path="/profile/:id"
              element={username ? <UserProfile /> : <Forbidden />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
