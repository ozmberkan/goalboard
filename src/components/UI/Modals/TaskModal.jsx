import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "~/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import moment from "moment";
import {
  RiCheckboxCircleLine,
  RiCircleFill,
  RiCircleLine,
  RiFileAddFill,
  RiStopCircleLine,
} from "react-icons/ri";
import { IoAdd, IoArchiveOutline } from "react-icons/io5";
import Avatar from "~/assets/noavatar.png";
import { useForm } from "react-hook-form";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";

const TaskModal = ({ setIsTaskModal, selectedTask, projectID }) => {
  const modalRoot = document.getElementById("modal");

  const [projectUsers, setProjectUsers] = useState([]);

  const [selectedPerson, setSelectedPerson] = useState(null);

  const getProjectUsers = async () => {
    try {
      const projectRef = doc(db, "projects", projectID);
      const projectSnap = await getDoc(projectRef);
      const projectMembers = projectSnap.data().projectMembers;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "in", projectMembers));

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjectUsers(users);
    } catch (error) {
      console.error("Error fetching project users:", error);
    }
  };

  useEffect(() => {
    getProjectUsers();
  }, []);

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      taskImportance: selectedTask.taskImportance,
    },
  });

  const updateTaskStatus = async (taskID, newStatus) => {
    try {
      const projectRef = doc(db, "projects", projectID);
      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();

      const taskToUpdate = projectData.tasks.find(
        (task) => task.taskID === taskID
      );

      if (taskToUpdate) {
        const updatedTasks = projectData.tasks.map((task) =>
          task.taskID === taskID ? { ...task, status: newStatus } : task
        );

        await updateDoc(projectRef, { tasks: updatedTasks });

        toast.success(`Görev ${newStatus} aşamasına taşındı!`);
        dispatch(getProjectsByID(projectID));
        setIsTaskModal(false);
      } else {
        toast.error("Bir hatayla karşılaşıldı.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  const archiveToTask = async (taskID) => {
    try {
      const projectRef = doc(db, "projects", projectID);
      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();

      const taskToUpdate = projectData.tasks.find(
        (task) => task.taskID === taskID
      );

      const updatedTasks = projectData.tasks.filter(
        (task) => task.taskID !== taskID
      );

      const archiveData = {
        ...taskToUpdate,
        archivedDate: moment().format("DD.MM.YYYY HH:mm"),
        archivedUser: user?.username,
      };

      if (taskToUpdate) {
        await updateDoc(projectRef, {
          tasks: updatedTasks,
          archiveTasks: arrayUnion(archiveData),
        });

        toast.success("Görev arşiv aşamasına taşındı!");
        dispatch(getProjectsByID(projectID));
        setIsTaskModal(false);
      } else {
        toast.error("Bir hatayla karşılaşıldı.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  const updateImportance = async (data) => {
    try {
      const projectRef = doc(db, "projects", projectID);
      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();

      const taskID = selectedTask.taskID;

      const taskToUpdate = projectData.tasks.find(
        (task) => task.taskID === selectedTask.taskID
      );

      if (taskToUpdate) {
        const updatedTasks = projectData.tasks.map((task) =>
          task.taskID === taskID
            ? { ...task, taskImportance: data.taskImportance }
            : task
        );

        await updateDoc(projectRef, { tasks: updatedTasks });

        toast.success(`Görevin aciliyet durumu değiştirildi!`);
        dispatch(getProjectsByID(projectID));
        setIsTaskModal(false);
      } else {
        toast.error("Bir hatayla karşılaşıldı.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };
  const updateTaskAttachmentUsers = async () => {
    try {
      const projectRef = doc(db, "projects", projectID);
      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();

      const taskID = selectedTask.taskID;

      const selectedData = {
        username: selectedPerson.username,
        uid: selectedPerson.uid,
        photoURL: selectedPerson.photoURL,
      };

      if (projectData) {
        const updatedTasks = projectData.tasks.map((task) => {
          if (task.taskID === taskID) {
            const alreadyAssigned = task.taskAttachmentUsers?.some(
              (user) => user.uid === selectedData.uid
            );

            if (alreadyAssigned) {
              toast.error("Bu kullanıcı zaten bu göreve atanmış.");
              return;
            }

            const updatedAttachmentUsers = [
              ...(task.taskAttachmentUsers || []),
              selectedData,
            ];
            return { ...task, taskAttachmentUsers: updatedAttachmentUsers };
          }
          return task;
        });

        await updateDoc(projectRef, { tasks: updatedTasks });

        toast.success(`Göreve seçilen kullanıcı atandı.`);
        dispatch(getProjectsByID(projectID));
        setIsTaskModal(false);
      } else {
        toast.error("Bir hatayla karşılaşıldı.");
      }
    } catch (error) {
      toast.error("Bir hata oluştu.");
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsTaskModal(false)}
        className="bg-zinc-900/50  p-8 fixed inset-0 z-50 grid place-items-center "
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white text-zinc-700  p-6 rounded-lg w-full max-w-5xl lg:h-[700px] shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className=" w-full  flex justify-between items-center">
              <h1 className="font-semibold text-xl">Görev Detayları</h1>
              <button
                onClick={() => setIsTaskModal(false)}
                className="p-2 bg-zinc-100 rounded-md"
              >
                <MdCancel size={20} />
              </button>
            </div>
            <div className="w-full flex mt-4 h-full gap-x-4 lg:flex-row flex-col">
              <div className="w-full rounded-xl bg-zinc-50 border p-5 flex flex-col gap-5 h-full  ">
                <div className=" w-full flex justify-between items-center border-b lg:pb-4 pb-1 ">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={
                        selectedTask.taskCreatorImage
                          ? selectedTask.taskCreatorImage
                          : Avatar
                      }
                      className="lg:w-10 lg:h-10 w-6 h-6 rounded-full object-cover"
                    />
                    <span className="lg:font-semibold font-medium text-zinc-700 ">
                      {selectedTask.taskCreatorName}
                    </span>
                  </div>
                  <h1 className="lg:text-sm text-xs">
                    {selectedTask.createdAt}
                  </h1>
                </div>
                <div className="w-full lg:h-full h-[100px] overflow-auto break-words">
                  {selectedTask.text}
                </div>
              </div>
              <div className="lg:w-[30%] lg:mt-0 mt-7  flex flex-col items-start justify-between gap-3">
                <div className="flex flex-col items-start gap-3 w-full">
                  <button
                    onClick={() =>
                      updateTaskStatus(selectedTask.taskID, "Yapılacaklar")
                    }
                    className="border flex items-center gap-x-1 font-medium w-full p-2 rounded-md hover:bg-primary transition-colors text-zinc-700 hover:text-white"
                  >
                    <RiCircleLine />
                    Yapılacaklar
                  </button>
                  <button
                    onClick={() =>
                      updateTaskStatus(selectedTask.taskID, "Devam Etmekte")
                    }
                    className="border flex items-center gap-x-1 font-medium w-full  p-2 rounded-md hover:bg-purple-500 transition-colors text-zinc-700 hover:text-white"
                  >
                    <RiCircleFill />
                    Devam Etmekte
                  </button>
                  <button
                    onClick={() =>
                      updateTaskStatus(selectedTask.taskID, "Test Aşamasında")
                    }
                    className="border flex items-center gap-x-1 font-medium w-full  p-2 rounded-md hover:bg-orange-500 transition-colors text-zinc-700 hover:text-white"
                  >
                    <RiStopCircleLine />
                    Test Aşamasında
                  </button>
                  <button
                    onClick={() =>
                      updateTaskStatus(selectedTask.taskID, "Tamamlandı")
                    }
                    className="border flex items-center gap-x-1 font-medium w-full  p-2 rounded-md hover:bg-green-500 transition-colors text-zinc-700 hover:text-white"
                  >
                    <RiCheckboxCircleLine />
                    Tamamlandı
                  </button>
                  <form
                    className="w-full flex flex-col gap-y-3 pt-5 border-t"
                    onSubmit={handleSubmit(updateImportance)}
                  >
                    <select
                      {...register("taskImportance")}
                      className="border flex items-center gap-x-1 font-medium w-full  p-2 rounded-md  transition-colors text-zinc-700"
                    >
                      <option value="low">Düşük</option>
                      <option value="normal">Normal</option>
                      <option value="high">Yüksek</option>
                    </select>
                    <button className="px-4 py-1.5 rounded-md bg-primary shadow-lg text-white">
                      Kaydet
                    </button>
                  </form>
                  <div className="w-full  gap-3 flex items-center justify-start ">
                    <Listbox
                      value={selectedPerson}
                      onChange={setSelectedPerson}
                    >
                      <div className="relative w-full">
                        <ListboxButton className="border flex items-center flex-1 gap-x-1 font-medium w-full p-2 rounded-md transition-colors text-zinc-700">
                          {selectedPerson?.username || "Bir kişi seçin"}
                        </ListboxButton>
                        <AnimatePresence>
                          <ListboxOptions className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                            {projectUsers.map((user) => (
                              <ListboxOption
                                key={user.uid}
                                value={{
                                  username: user.username,
                                  uid: user.uid,
                                  photoURL: user.photoURL,
                                }}
                                className={({ active }) =>
                                  `cursor-pointer select-none relative px-4 py-2 ${
                                    active
                                      ? "text-zinc-700 bg-zinc-100"
                                      : "text-gray-900"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {user.username}
                                    </span>
                                  </>
                                )}
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </AnimatePresence>
                      </div>
                    </Listbox>

                    <button
                      onClick={updateTaskAttachmentUsers}
                      className="px-3 rounded-md h-full bg-primary text-white"
                    >
                      <IoAdd size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-5 ">
                  <button
                    onClick={() => archiveToTask(selectedTask.taskID)}
                    className="border flex items-center gap-x-1 font-medium w-full  p-2 rounded-md hover:bg-violet-500 transition-colors text-zinc-700 hover:text-white"
                  >
                    <IoArchiveOutline />
                    Arşiv
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default TaskModal;
