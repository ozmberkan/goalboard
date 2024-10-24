import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { db } from "~/firebase/firebase";

const PricingCard = ({ card }) => {
  const { user } = useSelector((store) => store.user);

  const handleSelect = async (label) => {
    try {
      if (!user) {
        toast.error("Lütfen giriş yapınız.");
        return;
      }

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        premium: label,
      });
      toast.success("Başarıyla katıldınız.");
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div
      className={`lg:w-[400px] lg:h-[550px] w-full  rounded-md bg-white shadow-2xl p-4 flex flex-col items-center gap-y-5  ${
        card.label === "Gold" ? "lg:scale-105" : ""
      }`}
    >
      <div className="w-full py-2">
        <h1
          className={`text-4xl font-extrabold text-primaryDark
          ${
            card.label === "Silver" &&
            "bg-clip-text text-transparent bg-gradient-to-tr from-zinc-300 to-gray-700"
          }
          ${
            card.label === "Gold" &&
            "bg-clip-text text-transparent bg-gradient-to-tr from-yellow-400 to-yellow-700"
          }
          ${
            card.label === "Platinum" &&
            "bg-clip-text text-transparent bg-gradient-to-tr from-sky-700 to-slate-300"
          }
          `}
        >
          {card.label}
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-4">
        {card?.features?.map((feature, i) => (
          <p key={i} className="flex items-center w-full gap-x-2">
            <span className="text-green-500">
              <FaCheck />
            </span>
            <span className="font-medium text-zinc-700 lg:text-sm">
              {feature}
            </span>
          </p>
        ))}
      </div>
      <div className="flex items-center justify-start pt-3 gap-x-1 border-t w-full mt-auto ">
        <span className="lg:text-4xl font-semibold text-primary">
          {card.price}
        </span>
        <span className="text-zinc-500 text-base">/ay</span>
      </div>
      <button
        className="px-4 py-2 rounded-md bg-primary hover:bg-primaryDark transition-colors duration-300 text-white w-full"
        onClick={() => handleSelect(card.label)}
      >
        Hemen Katıl!
      </button>
    </div>
  );
};

export default PricingCard;
