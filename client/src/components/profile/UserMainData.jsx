export default function UserMainData({ userData, editMode, setOldImage }) {
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
  return (
    <>
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
      </div>
    </>
  );
}
