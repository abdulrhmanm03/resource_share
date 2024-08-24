import { useState } from "react";
import "./createpost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([""]);
  const [content, setContent] = useState([{ name: "", link: "" }]);

  const handleNameChange = (index, nameEvent) => {
    const values = [...content];
    values[index].name = nameEvent.target.value;
    setContent(values);
  };

  const handleLinkChange = (index, linkEvent) => {
    const values = [...content];
    values[index].link = linkEvent.target.value;
    setContent(values);
  };

  const handleAdd = () => {
    const values = [...content];
    values.push({ name: "", link: "" });
    setContent(values);
  };

  const handleRemove = (index) => {
    const values = [...content];

    if (values.length > 1) {
      values.splice(index, 1);
      setContent(values);
    }
  };

  async function handleSubmit() {
    let c = {};
    for (let i = 0; i < content.length; i++) {
      c[i] = content[i];
    }
    let contentJson = JSON.stringify(c);

    // const token = localStorage.getItem("token");
    console.log(topics);

    const formData = new FormData();
    formData.append("user_id", 1);
    formData.append("title", title);
    formData.append("topics", topics);
    formData.append("content", contentJson);

    let response = await fetch("http://localhost:3001/createpost", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      alert("postcreated");
    }
    console.log(response);
  }

  return (
    <div className="createpost">
      <form className="createpost">
        <label htmlFor="title" className="createpost">
          title
        </label>
        <input
          type="text"
          name="title"
          className="createpost"
          placeholder="Enter post Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label htmlFor="topics" className="createpost">
          topics
        </label>
        <input
          type="text"
          name="topics"
          className="createpost"
          placeholder="Enter post topics"
          onChange={(e) => {
            setTopics(e.target.value);
          }}
        />

        {content.map((value, index) => (
          <div key={index}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              value={value.name}
              onChange={(event) => handleNameChange(index, event)}
            />

            <label htmlFor="link">link</label>
            <input
              type="text"
              name="link"
              value={value.link}
              onChange={(event) => handleLinkChange(index, event)}
            />

            <button type="button" onClick={() => handleRemove(index)}>
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAdd}>
          Add
        </button>
        <button type="button" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
