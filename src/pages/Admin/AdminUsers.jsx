import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "~/assets/noavatar.png";
import { motion } from "framer-motion";
import { FiEdit, FiLock, FiUnlock } from "react-icons/fi";
import AdminUserEditModal from "~/components/UI/Modals/Admin/AdminUserEditModal";
import { getAllUserForAdmin } from "~/redux/slices/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const AdminUsers = () => {
  const [animationParent] = useAutoAnimate();
  const { allUsers, user } = useSelector((store) => store.user);
  const [search, setSearch] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserForAdmin());
  }, [dispatch]);

  const filteredUsers = allUsers.filter((user) => {
    return user.username.toLowerCase().includes(search.toLowerCase());
  });

  const openModal = (user) => {
    setIsEditMode(true);
    setSelectedUser(user);
  };

  const disableUser = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);

      const disableData = {
        ...user,
        disabled: true,
      };

      if (user.disabled) {
        await updateDoc(userRef, {
          ...user,
          disabled: false,
        });
        toast.success("Kullanıcı başarıyla aktif hale getirildi.");
        dispatch(getAllUserForAdmin());
        return;
      }

      if (user.role === "admin") {
        toast.error("Yönetici kullanıcılar devre dışı bırakılamaz.");
        return;
      }

      await updateDoc(userRef, disableData);
      toast.success("Kullanıcı başarıyla devre dışı bırakıldı.");
      dispatch(getAllUserForAdmin());
    } catch (error) {}
  };

  return (
    <>
      {isEditMode && (
        <AdminUserEditModal
          setIsEditMode={setIsEditMode}
          selectedUser={selectedUser}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col flex-grow lg:p-6 p-2  gap-y-2 bg-white "
      >
        <div className="w-full   px-4 py-2 flex justify-between items-center h-18 border-b">
          <span className="lg:text-2xl text-lg font-bold text-zinc-600 lg:flex hidden">
            Kullanıcılar
          </span>
          <div className="lg:pl-5 py-2 lg:border-l flex items-center gap-x-3">
            <img
              src={user.photoURL ? user.photoURL : Avatar}
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex flex-col gap-y-1 text-zinc-600">
              <div className="text-sm">{user.email}</div>
              <div className="text-sm">@{user.username}</div>
            </div>
          </div>
        </div>
        <div className="w-full  h-full flex flex-col gap-y-5">
          <div className=" w-full flex gap-x-2 items-center px-4">
            <input
              placeholder="Ara.."
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/2 px-4 bg-zinc-50 flex-1 py-2 rounded-md border focus:outline-none "
            />
            <span className="flex px-4 gap-x-2 py-2 rounded-md border bg-zinc-50 justify-center items-center">
              {allUsers.length}{" "}
              <span className="lg:flex hidden">Kullanıcı</span>
            </span>
          </div>
          <div
            className="w-full  grid lg:grid-cols-4 grid-cols-1 place-items-start gap-6 px-4"
            ref={animationParent}
          >
            {filteredUsers.map((user) => (
              <div
                key={user.uid}
                className=" w-full rounded-md bg-zinc-50 border p-3 "
              >
                <div className="w-full  flex justify-between items-center ">
                  <div className="flex items-center lg:gap-x-3 gap-x-2">
                    <img
                      src={user.photoURL ? user.photoURL : Avatar}
                      className="lg:w-10 lg:h-10 w-7 h-7 rounded-full object-cover"
                    />
                    <span
                      className={`  lg:text-base text-sm  font-semibold ${
                        user?.role === "admin"
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-blue-500"
                          : "text-zinc-600"
                      }  `}
                    >
                      {user.username}
                    </span>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <button
                      onClick={() => openModal(user)}
                      className="lg:p-2 p-1 rounded-md bg-white border"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => disableUser(user)}
                      className={`lg:p-2 p-1 rounded-md bg-white border ${
                        !user.disabled ? "text-zinc-700" : "text-green-500"
                      }`}
                    >
                      {user.disabled ? <FiUnlock /> : <FiLock />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminUsers;
