import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { db } from "~/firebase/firebase";

const Invites = () => {
  const { user } = useSelector((store) => store.user);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-grow p-4 flex">
      <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative  overflow-hidden">
        <h1 className="text-3xl font-semibold text-primary">Gelen Davetler</h1>
        <div className="flex-grow ">
          <div className="flex flex-col gap-y-5 w-1/2">
            {user.notification.length > 0 ? (
              _user.notification?.map((noti, i) => (
                <div
                  className="bg-zinc-50 border rounded-md px-4 py-2 flex justify-between items-center"
                  key={i}
                >
                  <div className="flex items-center gap-x-1">
                    <span className="text-primary font-medium">
                      @{noti.from}{" "}
                    </span>
                    <span>{noti.message}</span>
                  </div>
                  <div className="flex gap-x-4">
                    <button
                      onClick={() => confirmInvite(noti)}
                      className="bg-green-100 text-green-500 px-4 py-2 rounded-md"
                    >
                      <FaCheck />
                    </button>
                    <button className="bg-red-100 text-red-500 px-4 py-2 rounded-md">
                      <MdCancel />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-blue-100 px-4  py-2 rounded-md">
                <h1 className="text-lg font-semibold text-primary">
                  Herhangi bir davetiniz yok.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invites;
