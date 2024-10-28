import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { nanoid } from "nanoid";
import Avatar from "~/assets/noavatar.png";
import toast from "react-hot-toast";
import moment from "moment";

const AdminNotification = () => {
  const { user } = useSelector((store) => store.user);

  const { handleSubmit, register, reset } = useForm();

  const sendNotification = async (data) => {
    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("username", "==", data.username));

      const querySnapshot = await getDocs(q);

      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (userData.length > 0) {
        const userDocRef = doc(db, "users", userData[0].id);

        const notificationData = {
          from: "Admin",
          message: data.message,
          sendTime: moment().format("DD.MM.YYYY HH:mm"),
          notificationID: nanoid(),
        };

        await updateDoc(userDocRef, {
          notification: arrayUnion(notificationData),
        });

        toast.success("Bildirim Gönderildi");
        reset();
      } else {
        console.log("Kullanıcı bulunamadı");
        toast.error("Kullanıcı bulunamadı");
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-grow lg:p-6 p-2 justify-start items-start flex-col gap-y-2 bg-white dark:bg-darkPrimary"
    >
      <div className="w-full px-4 py-2 flex justify-between items-center h-18 border-b dark:border-darkBorder">
        <span className="lg:text-2xl text-lg font-bold text-zinc-600 dark:text-darkText lg:flex hidden">
          Kullanıcıya Bildirim Gönder
        </span>
        <div className="lg:pl-5 py-2 lg:border-l dark:border-darkBorder flex items-center gap-x-3">
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
      <form
        className="lg:p-4 p-3 flex flex-col lg:w-1/2 w-full gap-y-4 "
        onSubmit={handleSubmit(sendNotification)}
      >
        <input
          placeholder="Kullanıcı Adı Giriniz.."
          {...register("username")}
          className="px-4 py-2 rounded-md bg-zinc-50 dark:bg-transparent dark:border-darkBorder dark:text-white border outline-none w-full"
        />
        <input
          placeholder="Bildirim İçeriği"
          {...register("message")}
          className="px-4 py-2 rounded-md bg-zinc-50 dark:bg-transparent dark:border-darkBorder dark:text-white border outline-none w-full"
        />
        <button className="bg-primary dark:hover:bg-darkPrimary dark:border-darkBorder border border-transparent dark:hover:text-darkText text-white rounded-md p-2">
          Gönder
        </button>
      </form>
    </motion.div>
  );
};

export default AdminNotification;
