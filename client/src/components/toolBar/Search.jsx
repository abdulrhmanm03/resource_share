import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  async function search(query) {
    if (!query) return;
    try {
      const response = await fetch(`http://localhost:3001/searchPost/${query}`);
      const results = await response.json();
      console.log(results);
      return results;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  async function handleSubmit() {
    if (query.trim()) {
      const posts = await search(query);
      navigate(`/search?query=${query}`, { state: posts });
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
