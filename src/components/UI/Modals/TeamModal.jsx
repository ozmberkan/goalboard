import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, getAllTeams } from "~/redux/slices/teamsSlice";
import toast from "react-hot-toast";
import { getUserByID } from "~/redux/slices/userSlice";
import { Link } from "react-router-dom";

const TeamModal = ({ setIsTeamModal }) => {
  const modalRoot = document.getElementById("modal");
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { register, handleSubmit } = useForm();

  const createTeamHandle = (data) => {
    try {
      if (user.premium === "Silver" && user.teams.length >= 1) {
        toast.error(
          "Gold üye olmadığınız için sadece 1 takım oluşturabilirsiniz."
        );
        return;
      }
      if (user.premium === "Gold" && user.teams.length >= 3) {
        toast.error(
          "Platinum üye olmadığınız için sadece 3 takım oluşturabilirsiniz."
        );
        return;
      }
      if (user.premium === "Platinum" && user.teams.length >= 5) {
        toast.error("Takım sınırına ulaştınız.", {
          style: {
            padding: "7px",
            color: "#000",
          },
          iconTheme: {
            primary: "#ffdd33",
            secondary: "#FFFAEE",
          },
        });
        return;
      }
      dispatch(createTeam({ teamName: data.teamName, id: user.uid }));

      dispatch(getAllTeams());

      toast.success("Takım başarıyla oluşturuldu!");
      setIsTeamModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Takım oluşturulurken bir hata oluştu." + error);
    }
  };

  useEffect(() => {
    dispatch(getUserByID(user.uid));
  }, [dispatch]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsTeamModal(false)}
        className="bg-zinc-900/50  p-8 fixed inset-0 z-50 grid place-items-center "
      >
        <motion.div
          initial={{ scale: 0, rotate: "-25.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-primary to-primaryDark dark:from-darkPrimary dark:to-darkBox  border border-transparent dark:border-darkBorder  p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10 flex items-start flex-col gap-y-3 justify-start">
            <h3 className="lg:text-3xl text-2xl font-bold text-center mb-2 text-white">
              Takım Oluştur
            </h3>
            <p className="text-left ">
              <span className="flex items-center gap-x-3 w-full text-white">
                <FiAlertCircle size={25} />
                <span className="text-sm text-white">
                  Premium üyeler daha fazla takım oluşturabilir. İncelemek için
                  <Link className="underline" to="/pricing">
                    {" "}
                    göz atın.
                  </Link>
                </span>
              </span>
            </p>
            <form
              className="flex gap-2  py-4 border-t border-zinc-500 w-full "
              onSubmit={handleSubmit(createTeamHandle)}
            >
              <input
                className="px-4 lg:w-full w-full py-2 rounded-md border text-sm outline-none text-black"
                placeholder="Takım Adı Giriniz.."
                {...register("teamName", { required: true })}
              />
              <button
                type="submit"
                className="lg:w-10 lg:h-10 flex justify-center items-center text-white"
              >
                <IoMdAddCircle size={30} />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default TeamModal;
