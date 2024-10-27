import { collection, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ContactsInput } from "~/data/data";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";
import moment from "moment";

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
        phone: data.phone,
        name: data.name,
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
    <div className="flex-grow p-4 flex">
      <div className="w-full border bg-white dark:bg-darkBox dark:border-darkBorder rounded-md p-8 flex  gap-x-4 relative  overflow-hidden transition-all duration-500">
        <form
          className="lg:w-1/2 grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(contactHandle)}
        >
          <h1 className="text-4xl font-bold text-primary">İletişim</h1>
          {ContactsInput.map((input) => (
            <div key={input.id} className="flex flex-col">
              {input.type === "text" ? (
                <input
                  className="border px-4 dark:bg-transparent dark:border-darkBorder py-2 rounded-md outline-none"
                  placeholder={input.placeholder}
                  type="text"
                  {...register(input.name, { required: true })}
                />
              ) : (
                <textarea
                  className="border px-4 dark:bg-transparent dark:border-darkBorder py-2 rounded-md outline-none min-h-[75px] max-h-[75px]"
                  placeholder={input.placeholder}
                  {...register(input.name, { required: true })}
                />
              )}
              <span className="text-sm text-red-500">
                {errors[input.name] && errors[input.name].message}
              </span>
            </div>
          ))}

          <button className="bg-primary p-2 text-white dark:bg-darkPrimary dark:border-darkBorder dark:text-darkText rounded-md border border-transparent hover:border-primary hover:text-primary hover:bg-white">
            Gönder
          </button>
        </form>
        <div className="w-1/2 h-full px-3 flex itemst-start flex-col gap-y-5">
          <p className="text-3xl font-semibold text-zinc-700 dark:text-neutral-400">
            Bizimle iletişime geçmek için soldaki formu doldurabilirsiniz.
          </p>
          <div className="flex flex-col gap-y-2 dark:text-darkText">
            <span>123 Hedef Sokak 34000 İzmir, </span>
            <span>Türkiye Email: info@goalborad.com</span>
            <span>Tel: +90 (212) 123 4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
