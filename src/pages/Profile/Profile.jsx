import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByID } from "~/redux/slices/userSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserByID(user?.uid));
  }, [dispatch]);

  console.log(user);

  return (
    <div className="flex-grow">
      Profile - {user?.email} - {user?.username}
    </div>
  );
};

export default Profile;
