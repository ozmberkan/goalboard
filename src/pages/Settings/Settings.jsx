import { query } from "firebase/database";
import { collection, doc, getDocs, updateDoc, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegSave } from "react-icons/fa";
import { IoBackspaceOutline } from "react-icons/io5";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import {
  MdModeEdit,
  MdOutlineLockReset,
  MdOutlineVerified,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "~/firebase/firebase";
import { getUserByID } from "~/redux/slices/userSlice";

const Settings = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  const sendResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success("Şifre sıfırlama e-postası gönderildi.");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success(
        "E-Posta Doğrulama gönderildi. Lütfen e-postanızı kontrol edin."
      );
    } catch (error) {
      toast.error(
        "Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyin."
      );
    }
  };

  const updatePremium = async () => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        premium: "Silver",
      });

      toast.success(
        "Premium hesabınız güncellendi. Satın almanız geri yüklendi. Silver premium hesabınızı kullanabilirsiniz."
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (data) => {
    try {
      const userRef = doc(db, "users", user.uid);

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", data.username));
      const querySnapshot = await getDocs(q);

      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (userData.length > 0 && userData[0].id !== user.uid) {
        toast.error("Bu kullanıcı adı zaten kullanılıyor.");
        return;
      }

      await updateDoc(userRef, {
        username: data.username,
        email: data.email,
      });

      toast.success("Profil Güncellendi");
      dispatch(getUserByID(user.uid));
      setEditMode(false);
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
        <h1 className="text-3xl font-semibold text-primary">Ayarlar</h1>
        <div className="flex lg:flex-row flex-col items-start gap-x-2 mt-3 w-full h-full  ">
          <div className="w-full h-full flex flex-col gap-y-5 lg:border-r">
            <form
              className="w-full lg:pr-4  grid lg:grid-cols-3 grid-cols-1 place-content-start gap-5 "
              onSubmit={handleSubmit(updateProfile)}
            >
              <input
                placeholder="Kullanıcı Adı"
                className="px-4 py-2 h-12 rounded-md bg-zinc-50 border text-zinc-700 outline-none disabled:bg-zinc-200 disabled:text-zinc-400"
                defaultValue={user?.username}
                disabled={!editMode}
                {...register("username")}
              />
              <input
                placeholder="E-Posta"
                className="px-4 py-2 h-12 rounded-md bg-zinc-50 border text-zinc-700 outline-none disabled:bg-zinc-200 disabled:text-zinc-400"
                defaultValue={user?.email}
                disabled={!editMode}
                {...register("email")}
              />

              {editMode && (
                <button
                  type="submit"
                  className="px-4 py-2 h-12 gap-x-2 rounded-md border bg-primary hover:bg-primaryDark transition-colors duration-300 text-white  flex justify-start items-center "
                >
                  <FaRegSave size={18} />
                  Kaydet
                </button>
              )}
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(!editMode)}
                  className="px-4 py-2 h-12 gap-x-2 rounded-md border bg-primary hover:bg-primaryDark transition-colors duration-300 text-white  flex justify-start items-center "
                >
                  <MdModeEdit size={18} />
                  Düzenle
                </button>
              )}
            </form>
            <hr />
            <div className=" grid lg:grid-cols-2 gap-5 lg:pr-4 w-full">
              <button
                type="button"
                onClick={sendResetPassword}
                className=" px-4 gap-x-2 py-2 h-12 rounded-md border hover:bg-primary hover:border-white hover:text-white transition-colors duration-300 bg-white border-primary text-primary  flex justify-start  items-center"
              >
                <MdOutlineLockReset size={20} />
                Şifre Sıfırla
              </button>
              {auth.currentUser.emailVerified === true ? (
                <span
                  type="button"
                  className="px-4 gap-x-2 py-2 h-12 rounded-md border bg-primary transition-colors duration-300   text-white  flex justify-start  items-center"
                >
                  <MdOutlineVerified size={20} />
                  E-Posta Doğrulanmış!
                </span>
              ) : (
                <button
                  type="button"
                  onClick={confirmEmail}
                  className="px-4 gap-x-2 py-2 h-12 rounded-md border hover:bg-primary hover:border-white hover:text-white transition-colors duration-300 bg-white border-primary text-primary  flex justify-start  items-center"
                >
                  <MdOutlineVerified size={20} />
                  E-Posta Doğrula
                </button>
              )}
              <button
                type="button"
                onClick={updatePremium}
                className="px-4 gap-x-2 relative  py-2 h-12 rounded-md border hover:bg-red-500 hover:border-white hover:text-white transition-colors duration-300 bg-white border-red-500 text-red-500  flex justify-start  items-center"
              >
                <IoBackspaceOutline size={20} />
                Satın Almayı Geri Yükle
                <span className="absolute right-5 lg:block hidden  top-2  text-white bg-gradient-to-r from-red-500 to-red-800  px-4 py-1 rounded-md text-sm">
                  Dikkat
                </span>
              </button>
            </div>
          </div>
          <div className="w-1/4  lg:block hidden h-full">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-14 h-7   bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Yapım Aşamasında (Tema)
              </span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
