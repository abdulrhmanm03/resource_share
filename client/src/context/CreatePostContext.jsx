import { createContext, useContext, useState } from "react";

const CreatePostContext = createContext();

export function useCreatePostContext() {
  return useContext(CreatePostContext);
}

export function CreatePostContextProvider({ children }) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const openCreatePost = () => setIsCreatePostOpen(true);
  const closeCreatePost = () => setIsCreatePostOpen(false);

  return (
    <CreatePostContext.Provider
      value={{ isCreatePostOpen, openCreatePost, closeCreatePost }}
    >
      {children}
    </CreatePostContext.Provider>
  );
}
