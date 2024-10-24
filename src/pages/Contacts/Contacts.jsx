import { zodResolver } from "@hookform/resolvers/zod";
import { collection, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ContactsInput } from "~/data/data";
import { db } from "~/firebase/firebase";
import { contactScheme } from "~/validation/scheme";
import toast from "react-hot-toast";

const Contacts = () => {
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
        name: data.name,
        phone: data.phone,
        message: data.message,
      });
      reset();
      toast.success("Mesajınız başarıyla gönderildi");
    } catch (error) {
      toast.error("Bir hata oluştu" + error);
    }
  };

  return (
    <div className="flex-grow p-4 flex">
      <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative  overflow-hidden">
        <h1 className="text-4xl font-bold text-primary">İletişim</h1>

        <form
          className="lg:w-1/2 grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(contactHandle)}
        >
          {ContactsInput.map((input) => (
            <div key={input.id} className="flex flex-col">
              {input.type === "text" ? (
                <input
                  className="border px-4 py-2 rounded-md outline-none"
                  placeholder={input.placeholder}
                  type="text"
                  {...register(input.name)}
                />
              ) : (
                <textarea
                  className="border px-4 py-2 rounded-md outline-none"
                  placeholder={input.placeholder}
                  {...register(input.name)}
                />
              )}
              <span className="text-sm text-red-500">
                {errors[input.name] && errors[input.name].message}
              </span>
            </div>
          ))}

          <button className="bg-primary p-2 text-white">Gönder</button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
