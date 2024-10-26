import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "~/assets/noavatar.png";
import { motion } from "framer-motion";
import { FiEdit, FiLock, FiSearch, FiUnlock } from "react-icons/fi";
import AdminUserEditModal from "~/components/UI/Modals/Admin/AdminUserEditModal";
import { getAllUserForAdmin } from "~/redux/slices/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa6";

const AdminUsers = () => {
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
        className="flex flex-grow  lg:p-6 p-2 justify-start items-start flex-col gap-y-2 bg-white"
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
        <div className="w-full flex justify-start gap-x-5  items-center px-4  ">
          <div className="bg-zinc-50 flex items-center h-10 gap-x-5 border rounded-md px-4">
            <FiSearch />
            <input
              type="text"
              placeholder="Ara"
              className="h-10 bg-transparent outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-zinc-700  bg-zinc-100 rounded-md w-full py-1 flex justify-center items-center gap-x-1 border">
            {allUsers.length} <span className="lg:flex hidden">Kullanıcı</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-1 place-items-center w-full lg:mt-2 mt-0 px-4 py-5 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.uid}
              className=" w-full rounded-md bg-zinc-50 border p-3 "
            >
              <div className="w-full flex items-center justify-between gap-x-3 p ">
                <div className="flex gap-x-3 items-center">
                  <img
                    src={user.photoURL ? user.photoURL : Avatar}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span
                    className={` text-xl   font-semibold ${
                      user.role === "admin"
                        ? "bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent"
                        : "text-zinc-600"
                    } `}
                  >
                    {user.username}
                  </span>
                </div>

                <div className="flex gap-x-2">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-white rounded-md p-1 border"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => disableUser(user)}
                    className={`bg-zinc-200 rounded-md p-1 border ${
                      user.disabled ? "text-green-500" : "text-zinc-700"
                    }`}
                  >
                    {user?.disabled === true ? <FiUnlock /> : <FiLock />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default AdminUsers;
