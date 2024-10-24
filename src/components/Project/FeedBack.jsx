import { collection, doc, setDoc } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiFeedbackLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { ContactsInput, FeedBacksInput } from "~/data/data";
import { db } from "~/firebase/firebase";

const FeedBack = () => {
  const { user } = useSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const contactHandle = async (data) => {
    try {
      const contactRef = doc(collection(db, "contacts"));
      await setDoc(contactRef, {
        messageID: contactRef.id,
        teamName: data.teamName,
        projectName: data.projectName,
        username: data.username,
        message: data.message,
        createdAt: moment().format("DD.MM.YYYY HH:mm"),
      });
      reset();
      toast.success("Mesajınız başarıyla gönderildi");
    } catch (error) {
      toast.error("Bir hata oluştu" + error);
    }
  };

  return (
    <div className="h-full">
      <div className="w-full py-3 border-b mb-4">
        <h1 className="lg:text-xl text-lg font-semibold flex items-center gap-x-1">
          <RiFeedbackLine />
          Geri bildirim
        </h1>
      </div>
      <form
        className="lg:w-1/2 grid grid-cols-1 gap-5"
        onSubmit={handleSubmit(contactHandle)}
      >
        {FeedBacksInput.map((input) => (
          <div key={input.id} className="flex flex-col">
            {input.type === "text" ? (
              <input
                className="border px-4 py-2 rounded-md outline-none"
                placeholder={input.placeholder}
                defaultValue={input.name === "username" ? user.username : ""}
                type="text"
                {...register(input.name, { required: true })}
              />
            ) : (
              <textarea
                className="border px-4 py-2 rounded-md outline-none min-h-[75px] max-h-[75px]"
                placeholder={input.placeholder}
                {...register(input.name)}
              />
            )}
            <span className="text-sm text-red-500">
              {errors[input.name] && errors[input.name].message}
            </span>
          </div>
        ))}

        <button className="bg-primary p-2 text-white rounded-md">Gönder</button>
      </form>
    </div>
  );
};

export default FeedBack;
