import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { getUserByID } from "~/redux/slices/userSlice";

const AddMemberModal = ({ setOpenModal }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const addMemberHandle = async (data) => {
    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("username", "==", data.username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnap) => {
          const userDocRef = doc(db, "users", docSnap.id);

          const currentNotification = docSnap.data().notification || [];

          await updateDoc(userDocRef, {
            notification: [
              ...currentNotification,
              {
                message: `${user.username} seni takımına eklemek istiyor.`,
              },
            ],
          });

          toast.success(`${data.username}'a/e bildirim gönderildi, `);
          dispatch(getUserByID(user.uid));
        });
      } else {
        toast.error("Bu kullanıcı bulunamadı.");
      }
    } catch (error) {
      toast.error("Hata:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="absolute inset-0"
        onClick={() => setOpenModal(false)}
      ></div>

      <div
        className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Ekle</h2>

          <form onSubmit={handleSubmit(addMemberHandle)}>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              className="px-4 py-2 rounded-md w-full border outline-none mb-4"
              {...register("username")}
            />
            <div className="mt-auto bg-zinc-50 w-full p-3 rounded-b-lg flex justify-end items-center gap-x-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Ekle
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Kapat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
