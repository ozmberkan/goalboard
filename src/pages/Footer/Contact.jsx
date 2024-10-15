import { collection, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { db } from "~/firebase/firebase";
import toast from "react-hot-toast";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const sendMessageHandle = async (data) => {
    try {
      const messagesRef = doc(collection(db, "messages"));
      await setDoc(messagesRef, {
        displayName: data.displayName,
        title: data.title,
        message: data.message,
        id: messagesRef.id,
      });
      toast.success("Mesajınız başarıyla gönderildi.");
      reset();
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <div className="flex flex-grow justify-start items-start w-full border container mx-auto rounded-md bg-white p-8 flex-col gap-y-4">
      <h1 className="text-primary text-4xl font-semibold">İletişim</h1>
      <div className="flex w-full items-start justify-start gap-x-4">
        <form
          className="w-1/2 grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(sendMessageHandle)}
        >
          <input
            type="text"
            placeholder="Adınız.."
            className="px-4 py-2 rounded-md border-2 outline-none"
            {...register("displayName")}
          />
          <input
            type="text"
            placeholder="Konu Başlığı"
            className="px-4 py-2 rounded-md border-2 outline-none"
            {...register("title")}
          />
          <textarea
            type="text"
            placeholder="Mesajınız.."
            className="px-4 py-2 rounded-md border-2 outline-none min-h-[200px] max-h-[200px]"
            {...register("message")}
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/95">
            Gönder
          </button>
        </form>

        <div className="w-1/2 flex flex-col gap-y-4  p-4 rounded-md">
          <div className="flex items-center gap-x-2">
            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            <p className="text-lg">1234 Main Street, Anytown, CA 12345</p>
          </div>
          <div className="flex items-center gap-x-2">
            <FaPhone className="text-blue-600 text-2xl" />
            <p className="text-lg">+90 555 555 55 55</p>
          </div>
          <div className="flex items-center gap-x-2">
            <FaEnvelope className="text-blue-600 text-2xl" />
            <p className="text-lg">info@goalboard.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
