import styles from "./profile.module.css";

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
      <div className={styles.maindata}>
        <div className={styles.profileimgcontainer}>
          <img src={userData.imageURL} alt="" className={styles.profileimg} />

          {editMode && (
            <>
              <i className={`fa-solid fa-pen-to-square ${styles.editicon}`}></i>
              <input
                type="file"
                onChange={handleFileChange}
                className={styles.transparentfileinput}
              />
            </>
          )}
        </div>
        <h2 className={styles.username}>{userData.username}</h2>
      </div>
      <div className={styles.bio}>
        {editMode ? (
          <textarea
            className={styles.editbio}
            onChange={handleTextChange}
            value={userData.bio || ""}
          ></textarea>
        ) : (
          <p>{userData.bio}</p>
        )}
      </div>
    </>
  );
}
