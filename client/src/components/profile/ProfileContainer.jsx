import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import EditButton from "./EditButton";
import UserMainData from "./UserMainData";
import UserSubData from "./UserSubData";
import FollowButton from "./FollowButton";
import { useRegistration } from "../../context/RegistrationContext";

export default function ProfileContainer({ userData }) {
  const { user } = useRegistration();
  const [editMode, setEditMode] = useState(false);

  const [oldImage, setOldImage] = useState("");

  const [isUserProfile, setIsUserProfile] = useState(false);

  const [numFollowers, setNumFollowers] = useState(3);
  const [numFollowes, setnumFollowes] = useState(4);

  useEffect(() => {
    if (user?.id && userData?.id) {
      setIsUserProfile(user.id == userData.id);
    }
  }, [user, userData]);

  return (
    <div className={styles.profilecontainer}>
      <UserMainData
        userData={userData}
        editMode={editMode}
        setOldImage={setOldImage}
      />
      <div className={styles.subdatacontainer}>
        {!editMode && (
          <UserSubData
            userData={userData}
            numFollowers={numFollowers}
            setNumFollowers={setNumFollowers}
            numFollowes={numFollowes}
            setnumFollowes={setnumFollowes}
          />
        )}
        {isUserProfile ? (
          <EditButton
            editMode={editMode}
            setEditMode={setEditMode}
            userData={userData}
            oldImage={oldImage}
          />
        ) : (
          <FollowButton
            userData={userData}
            numFollowers={numFollowers}
            setNumFollowers={setNumFollowers}
          />
        )}
      </div>
    </div>
  );
}
