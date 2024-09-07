import { useState } from "react";

export default function ProfileContainer({ userData }) {
  const [editMode, setEditMode] = useState(false);

  const [oldImage, setOldImage] = useState("");

  const handleTextChange = (e) => {
    userData.setBio(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOldImage(userData.image.name || userData.image);
      userData.setImage(file);
      userData.setImageURL(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfileSubmit = async () => {
    const formData = new FormData();
    formData.append("user_id", userData.id);
    formData.append("bio", userData.bio);
    formData.append("oldImage", oldImage);
    formData.append("image", userData.image);

    // Replace with your own API endpoint or destination
    const response = await fetch("http://localhost:3001/updateprofile", {
      method: "PUT",
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
          <img src={userData.imageURL} alt="" className="profileImg" />

          {editMode && (
            <>
              <p className="de">edit</p>
              <input type="file" onChange={handleFileChange} className="d" />
            </>
          )}
        </div>
        <h2 className="username">{userData.username}</h2>
      </div>
      <div className="right">
        <div className="bio">
          {editMode ? (
            <textarea
              className="editbio"
              onChange={handleTextChange}
              value={userData.bio || ""}
            ></textarea>
          ) : (
            <p>{userData.bio}</p>
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
