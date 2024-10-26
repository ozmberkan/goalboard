import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { motion } from "framer-motion";
import { getUserByID } from "~/redux/slices/userSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Invites = () => {
  const { user } = useSelector((store) => store.user);
  const [animationParent] = useAutoAnimate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByID(user?.uid));
  }, []);

  const confirmInvite = async (noti) => {
    try {
      const teamRef = doc(db, "teams", noti.teamID);
      const userRef = doc(db, "users", user.uid);

      await updateDoc(teamRef, {
        members: arrayUnion(user.uid),
      });

      await updateDoc(userRef, {
        notification: arrayRemove({
          id: noti.id,
          from: noti.from,
          message: noti.message,
          teamID: noti.teamID,
        }),
      });

      toast.success("Davet kabul edildi.");
      dispatch(getUserByID(user?.uid));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmProjectInvite = async (noti) => {
    try {
      const projectRef = doc(db, "projects", noti.projectID);
      const userRef = doc(db, "users", user.uid);

      await updateDoc(projectRef, {
        projectMembers: arrayUnion(user.uid),
      });

      await updateDoc(userRef, {
        notification: arrayRemove({
          id: noti.id,
          from: noti.from,
          message: noti.message,
          projectID: noti.projectID,
        }),
      });

      toast.success("Davet kabul edildi.");
      dispatch(getUserByID(user?.uid));
    } catch (error) {
      console.log(error);
    }
  };

  const cancelInvite = async (noti) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        notification: arrayRemove({
          id: noti.id,
          from: noti.from,
          message: noti.message,
          teamID: noti.teamID,
        }),
      });

      toast.success("Davet reddedildi.");
      dispatch(getUserByID(user?.uid));
    } catch (error) {
      console.log(error);
    }
  };
  const cancelProjectInvite = async (noti) => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        notification: arrayRemove({
          id: noti.id,
          from: noti.from,
          message: noti.message,
          projectID: noti.projectID,
        }),
      });

      toast.success("Davet reddedildi.");
      dispatch(getUserByID(user?.uid));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNoti = async (noti) => {
    try {
      const userRef = doc(db, "users", user.uid);

      const updatedNoti = user.notification.filter(
        (n) => n.notificationID !== noti.notificationID
      );

      await updateDoc(userRef, {
        notification: updatedNoti,
      });

      toast.success("Bildirim Silindi.");
      dispatch(getUserByID(user?.uid));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-grow p-4 flex"
    >
      <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative  overflow-hidden">
        <h1 className="text-3xl font-semibold text-primary">
          Gelen Bildirimler
        </h1>
        <div className="flex-grow ">
          <div
            className="flex flex-col gap-y-5 lg:w-1/2 w-full"
            ref={animationParent}
          >
            {user.notification.length > 0 ? (
              user.notification?.map((noti, i) => (
                <div
                  className="bg-zinc-50 border rounded-md px-4 py-2 flex justify-between items-center"
                  key={i}
                >
                  <div className="flex   items-center gap-x-1">
                    <span className="text-primary font-medium">
                      @{noti.from}{" "}
                    </span>
                    <span>{noti.message}</span>
                  </div>

                  <div>
                    {noti.message === "Sizi takıma davet ediyor." && (
                      <div className="flex gap-x-4 ">
                        <button
                          onClick={() => confirmInvite(noti)}
                          className="bg-green-100 text-green-500 px-4 py-2 rounded-md"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => cancelInvite(noti)}
                          className="bg-red-100 text-red-500 px-4 py-2 rounded-md"
                        >
                          <MdCancel />
                        </button>
                      </div>
                    )}
                    {noti.from === "Admin" && (
                      <button
                        onClick={() => deleteNoti(noti)}
                        className="bg-red-100 text-red-500 px-4 py-2 rounded-md"
                      >
                        <MdCancel />
                      </button>
                    )}
                    {noti.message === "Sizi projeye davet ediyor." && (
                      <div className="flex gap-x-4">
                        <button
                          onClick={() => confirmProjectInvite(noti)}
                          className="bg-green-100 text-green-500 px-4 py-2 rounded-md"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => cancelProjectInvite(noti)}
                          className="bg-red-100 text-red-500 px-4 py-2 rounded-md"
                        >
                          <MdCancel />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-blue-100 px-4  py-2 rounded-md">
                <h1 className="lg:text-base text-sm font-medium text-primary">
                  Herhangi bir davetiniz ya da bildiriminiz mevcut değil!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Invites;
