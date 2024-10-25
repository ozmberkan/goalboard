import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import moment from "moment";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "~/firebase/firebase";
import { useDispatch } from "react-redux";
import { getAllProjects } from "~/redux/slices/projectsSlice";

const ProjectModal = ({ setIsProjectModal, teamID }) => {
  const modalRoot = document.getElementById("modal");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const createProjectHandle = async (data) => {
    try {
      const formattedDate = moment(data.lastDate).format("DD.MM.YYYY");

      const projectsRef = doc(collection(db, "projects"));
      const teamsRef = doc(db, "teams", teamID);

      const projectData = {
        creatorTeam: teamID,
        projectName: data.projectName,
        projectID: projectsRef.id,
        lastDate: formattedDate,
        tasks: [],
        archiveTasks: [],
        comments: [],
      };

      await setDoc(projectsRef, projectData);

      await updateDoc(teamsRef, {
        projects: arrayUnion(projectsRef.id),
      });

      toast.success("Proje başarıyla oluşturuldu!");
      dispatch(getAllProjects(teamID));
      setIsProjectModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsProjectModal(false)}
        className="bg-zinc-900/50  p-8 fixed inset-0 z-50 grid place-items-center "
      >
        <motion.div
          initial={{ scale: 0, rotate: "-25.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-primary to-primaryDark  p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10 flex items-start flex-col gap-y-3 justify-start">
            <h3 className="lg:text-3xl text-xl font-bold text-center mb-2 text-white">
              Projeni oluştur
            </h3>
            <p className="text-left ">
              <span className="flex items-center gap-x-3 w-full text-white">
                <FiAlertCircle size={25} />
                <span className="text-sm text-white">
                  Proje adını ve son tarihi belirleyerek projeyi oluştur.
                </span>
              </span>
            </p>
            <form
              className="flex gap-2  py-4 border-t border-zinc-500 w-full"
              onSubmit={handleSubmit(createProjectHandle)}
            >
              <input
                type="text"
                className=" px-4 lg:w-full w-full py-2 rounded-md border text-sm outline-none text-black"
                placeholder="Proje Adını Giriniz.."
                {...register("projectName")}
              />
              <input
                type="date"
                className=" px-4 lg:w-full w-full py-2 rounded-md border text-sm outline-none text-black"
                min={moment().format("YYYY-MM-DD")}
                {...register("lastDate")}
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

export default ProjectModal;
