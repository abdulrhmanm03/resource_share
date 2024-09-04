import "./profile.css";
import { useState, useEffect } from "react";
import { useRegistration } from "../../context/RegistrationContext";

function Profile() {
  const { user } = useRegistration();

  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setImage(user.image);
      setImageURL(`http://localhost:3001/uploads/${user.image}`);
      setBio(user.bio);
    }
  }, [user]);

  const username = user.username;
  const [editMode, setEditMode] = useState(false);

  const handleTextChange = (e) => {
    setBio(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOldImage(image.name || image);
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfileSubmit = async () => {
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("bio", bio);
    formData.append("oldImage", oldImage);
    formData.append("image", image);

    // Replace with your own API endpoint or destination
    const response = await fetch("http://localhost:3001/updateprofile", {
      method: "POST",
      body: formData,
    });

    console.log(response);

    setEditMode(false);
  };

  // TODO: allow only owner of the account to view the edit bottun
  return (
    <div className="profile">
      <div className="left">
        <div className="profileimgcontainer">
          <img src={imageURL} alt="" className="profileImg" />

          {editMode && (
            <>
              <p className="de">edit</p>
              <input type="file" onChange={handleFileChange} className="d" />
            </>
          )}
        </div>
        <h2 className="username">{username}</h2>
      </div>
      <div className="right">
        <div className="bio">
          {editMode ? (
            <textarea
              className="editbio"
              onChange={handleTextChange}
              value={bio || "love"}
            ></textarea>
          ) : (
            <p>{bio}</p>
          )}
        </div>
        <div className="extra">
          <h4 className="e">followers</h4>
          <h4 className="e">follows</h4>
          <h4 className="e">posts</h4>
          <h4 className="e">likes</h4>
          {editMode ? (
            <button className="editbtn" onClick={handleUpdateProfileSubmit}>
              save
            </button>
          ) : (
            <button
              className="editbtn"
              onClick={() => {
                setEditMode(true);
              }}
            >
              edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
