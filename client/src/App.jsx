import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import Layout from "./pages/Layout";
import { RegistrationProvider } from "./context/RegistrationContext";

function App() {
  return (
    <RegistrationProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<ProfilePage />} />
          <Route path="/Auth" element={<AuthPage />} />
          <Route path="/createPost" element={<CreatePostPage />} />
          <Route path="//post/:post_id" element={<PostPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </RegistrationProvider>
  );
}

export default App;
