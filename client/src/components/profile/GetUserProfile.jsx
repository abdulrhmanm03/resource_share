import { useState, useEffect } from "react";
import { useRegistration } from "../../context/RegistrationContext";
import ProfileContainer from "./ProfileContainer";

export default function GetUserProfile({ username }) {
  const { user } = useRegistration();

  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [bio, setBio] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3001/getuser/${username}`);
      const data = await response.json();
      const image = data.image;

      setId(data.id);
      setImage(data.image);
      setImageURL(`http://localhost:3001/uploads/${image}`);
      setBio(data.bio);
    }

    if (user && username == user.username) {
      setImage(user.image);
      setImageURL(`http://localhost:3001/uploads/${user.image}`);
      setBio(user.bio);
    } else {
      fetchData();
    }
  }, [user, username]);

  const userData = {
    image,
    setImage,
    imageURL,
    setImageURL,
    bio,
    setBio,
    username,
    id,
  };

  return <ProfileContainer userData={userData} />;
}
