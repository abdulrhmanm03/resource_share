export default function EditButton({
  editMode,
  setEditMode,
  userData,
  oldImage,
}) {
  async function handleClick() {
    if (editMode) {
      const formData = new FormData();
      formData.append("user_id", userData.id);
      formData.append("bio", userData.bio);
      formData.append("oldImage", oldImage);
      formData.append("image", userData.image);

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/updateprofile", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
      if (!response.ok) {
        alert("failed to updateprofile");
      }
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }
  return (
    <>
      <button onClick={handleClick}>{editMode ? "Save" : "edit"}</button>
      {editMode && <button onClick={() => setEditMode(false)}>cancel</button>}
    </>
  );
}
