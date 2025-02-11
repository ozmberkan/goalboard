import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import { MdOutlineSettings, MdCancel } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FiAlertCircle, FiLayout } from "react-icons/fi";
import Avatar from "~/assets/noavatar.png";
import { IoMenu } from "react-icons/io5";

import {
  RiCircleLine,
  RiCheckboxCircleLine,
  RiStopCircleLine,
  RiCircleFill,
} from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import TaskModal from "../UI/Modals/TaskModal";

const Tasks = ({ projectID }) => {
  const [animationParent] = useAutoAnimate();
  const { register, handleSubmit, reset } = useForm();
  const { currentProject, status } = useSelector((store) => store.projects);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [IsTaskModal, setIsTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const projectRef = doc(db, "projects", projectID);

    const unsubscribe = onSnapshot(projectRef, (doc) => {
      if (doc.exists()) {
        const projectData = doc.data();
        dispatch(getProjectsByID(projectID, projectData));
      } else {
        console.log("Proje bulunamadı!");
      }
    });

    return () => unsubscribe();
  }, [dispatch, projectID]);

  useEffect(() => {
    dispatch(getProjectsByID(projectID));
  }, []);

  const createTask = async (data) => {
    try {
      const projectRef = doc(db, "projects", projectID);

      const formattedDate = moment().format("DD.MM.YYYY HH:mm");

      const taskData = {
        taskID: nanoid(),
        taskCreator: user.uid,
        taskCreatorName: user.username,
        taskCreatorImage: user.photoURL,
        taskAttachmentUsers: [],
        taskImportance: "low",
        text: data.task,
        createdAt: formattedDate,
        status: "Yapılacaklar",
      };

      await updateDoc(projectRef, {
        tasks: arrayUnion(taskData),
      });

      toast.success("Başarıyla Eklendi");
      reset();
      dispatch(getProjectsByID(projectID));
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsTaskModal(true);
  };

  return (
    <>
      {IsTaskModal && (
        <TaskModal
          setIsTaskModal={setIsTaskModal}
          selectedTask={selectedTask}
          projectID={projectID}
        />
      )}
      <Tooltip
        id="username"
        className="z-20"
        style={{ backgroundColor: "#3a5adb" }}
      />
      <div className="h-full ">
        <div className="w-full py-3 border-b dark:border-darkBorder mb-4 flex justify-between items-center">
          <h1 className="lg:text-xl text-lg font-semibold flex items-center gap-x-1 dark:text-darkText">
            <FiLayout />
            Genel Bakış
          </h1>
          <h1 className="lg:text-xl text-lg font-bold  text-primary flex items-center gap-x-1">
            {currentProject?.projectName ? (
              currentProject.projectName
            ) : (
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-32 "></div>
              </div>
            )}
          </h1>
        </div>

        <div className="w-full grid lg:grid-cols-4 grid-cols-1 gap-8">
          <div className="bg-zinc-100 dark:bg-darkBox rounded-xl border dark:border-darkBorder shadow">
            <div className="w-full rounded-t-xl bg-gradient-to-r from-primary to-zinc-700  p-4 border-b dark:border-darkBorder border-zinc-500">
              <h1 className="text-lg text-white font-semibold flex items-center gap-x-2">
                <RiCircleLine size={20} />
                Yapılacaklar
              </h1>
            </div>
            <div className="w-full p-3 flex flex-col gap-y-2 border-b dark:border-darkBorder">
              <div className="bg-white dark:bg-darkBox w-full px-4 py-2 border dark:border-darkBorder rounded-md text-sm flex justify-between items-center">
                <form
                  className="w-full flex gap-x-1 "
                  onSubmit={handleSubmit(createTask)}
                >
                  <input
                    type="text"
                    placeholder="Yapılacak gir.."
                    className="w-full outline-none dark:bg-transparent dark:text-white"
                    {...register("task", { required: true })}
                  />
                  <button className="lg:px-4 px-2 py-1 rounded-md bg-primary dark:hover:bg-darkPrimary border border-transparent dark:border-darkBorder text-white hover:bg-primaryDark transition-colors">
                    Ekle
                  </button>
                </form>
              </div>
            </div>
            <div
              className="w-full  p-3  flex flex-col gap-y-2  overflow-auto h-[500px]"
              ref={animationParent}
            >
              {currentProject?.tasks?.map((task) => {
                return task.status === "Yapılacaklar" ? (
                  <div
                    key={task.taskID}
                    className="bg-white dark:bg-darkPrimary dark:border-darkBorder p-5 border rounded-md text-sm flex flex-col items-start justify-start gap-2 overflow-hidden min-h-32"
                  >
                    <div className="flex gap-x-2 items-center justify-between w-full border-b dark:border-darkBorder pb-2">
                      <div className="flex items-center gap-x-1 -space-x-3 ">
                        {task?.taskAttachmentUsers.map((user) => (
                          <img
                            key={user.uid}
                            data-tooltip-id="username"
                            data-tooltip-content={user.username}
                            src={user?.photoURL ? user.photoURL : Avatar}
                            className="w-7 h-7 rounded-full object-cover border-2 border-zinc-100 dark:border-darkBorder"
                          />
                        ))}
                        {task?.taskAttachmentUsers.length === 0 && (
                          <div className="text-xs text-red-500 flex items-center lg:gap-x-2 gap-x-1">
                            <FiAlertCircle size={18} />
                            Kullanıcı Atanmamış
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-x-3">
                        <span
                          className={`px-2 py-0.5 rounded-full   text-xs  ${
                            task.taskImportance === "low" &&
                            "bg-zinc-100 text-zinc-400 border border-zinc-300 dark:bg-darkBox dark:border-darkBorder"
                          }
                          ${
                            task.taskImportance === "normal" &&
                            "bg-orange-100 text-orange-400 border border-orange-500 dark:bg-orange-500 dark:text-orange-100"
                          }
                          ${
                            task.taskImportance === "high" &&
                            "bg-red-100 text-red-400 border border-red-500 dark:bg-red-500 dark:text-red-100"
                          }`}
                        >
                          {task.taskImportance === "low" && "Düşük"}
                          {task.taskImportance === "normal" && "Normal"}
                          {task.taskImportance === "high" && "Yüksek"}
                        </span>
                        <button
                          onClick={() => openModal(task)}
                          className=" text-zinc-700 text-2xl hover:text-zinc-900 dark:hover:text-darkText rounded-full"
                        >
                          <IoMenu />
                        </button>
                      </div>
                    </div>
                    <div className="w-full ">
                      <span className="dark:text-white">
                        {task.text.slice(0, 300)}...
                      </span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          {/* Yapılıyor */}
          <div className="bg-zinc-100 dark:bg-darkBox dark:border-darkBorder rounded-xl border shadow">
            <div className="w-full rounded-t-xl bg-gradient-to-r from-purple-500 to-zinc-700  p-4 border-b border-zinc-500 dark:border-darkBorder">
              <h1 className="text-lg text-white font-semibold flex items-center gap-x-2">
                <RiCircleFill size={20} />
                Devam Etmekte
              </h1>
            </div>

            <div
              className="w-full dark:bg-darkBox  p-3 flex flex-col gap-y-2  max-h-[650px] overflow-y-auto"
              ref={animationParent}
            >
              {currentProject?.tasks?.map((task) => {
                return task.status === "Devam Etmekte" ? (
                  <div
                    key={task.taskID}
                    className="bg-white dark:bg-darkPrimary dark:border-darkBorder p-5 border rounded-md text-sm flex flex-col items-start justify-start gap-2 overflow-hidden min-h-32"
                  >
                    <div className="flex gap-x-2 items-center justify-between w-full border-b dark:border-darkBorder pb-2">
                      <div className="flex items-center gap-x-1 -space-x-3 ">
                        {task?.taskAttachmentUsers.map((user) => (
                          <img
                            key={user.uid}
                            data-tooltip-id="username"
                            data-tooltip-content={user.username}
                            src={user?.photoURL ? user.photoURL : Avatar}
                            className="w-7 h-7 rounded-full object-cover border-2 border-zinc-100 dark:border-darkBorder"
                          />
                        ))}
                        {task?.taskAttachmentUsers.length === 0 && (
                          <div className="text-xs text-red-500 flex  items-center lg:gap-x-2 gap-x-1">
                            <FiAlertCircle />
                            Kullanıcı Atanmamış
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-x-3">
                        <span
                          className={`px-2 py-0.5 rounded-full   text-xs  ${
                            task.taskImportance === "low" &&
                            "bg-zinc-100 text-zinc-400 border border-zinc-300 dark:bg-darkBox dark:border-darkBorder"
                          }
                          ${
                            task.taskImportance === "normal" &&
                            "bg-orange-100 text-orange-400 border border-orange-500 dark:bg-orange-500 dark:text-orange-100"
                          }
                          ${
                            task.taskImportance === "high" &&
                            "bg-red-100 text-red-400 border border-red-500 dark:bg-red-500 dark:text-red-100"
                          }`}
                        >
                          {task.taskImportance === "low" && "Düşük"}
                          {task.taskImportance === "normal" && "Normal"}
                          {task.taskImportance === "high" && "Yüksek"}
                        </span>
                        <button
                          onClick={() => openModal(task)}
                          className=" text-zinc-700 text-2xl hover:text-zinc-900 dark:hover:text-darkText rounded-full"
                        >
                          <IoMenu />
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:h-full h-[100px] overflow-auto break-words">
                      <span className="dark:text-white">
                        {task.text.slice(0, 300)}...
                      </span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className="bg-zinc-100 dark:bg-darkBox dark:border-darkBorder rounded-xl border shadow">
            <div className="w-full rounded-t-xl bg-gradient-to-r from-orange-500 to-zinc-700  p-4 border-b dark:border-darkBox">
              <h1 className="text-lg text-white font-semibold flex gap-x-1 items-center">
                <RiStopCircleLine />
                Test Aşamasında
              </h1>
            </div>
            <div
              className="w-full  p-3 flex flex-col gap-y-2 max-h-[650px] overflow-y-auto"
              ref={animationParent}
            >
              {currentProject?.tasks?.map((task) => {
                return task.status === "Test Aşamasında" ? (
                  <div
                    key={task.taskID}
                    className="bg-white dark:bg-darkPrimary dark:border-darkBorder p-5 border rounded-md text-sm flex flex-col items-start justify-start gap-2 overflow-hidden min-h-32"
                  >
                    <div className="flex gap-x-2 items-center justify-between w-full border-b dark:border-darkBorder pb-2">
                      <div className="flex items-center gap-x-1 -space-x-3 ">
                        {task?.taskAttachmentUsers.map((user) => (
                          <img
                            key={user.uid}
                            data-tooltip-id="username"
                            data-tooltip-content={user.username}
                            src={user?.photoURL ? user.photoURL : Avatar}
                            className="w-7 h-7 rounded-full object-cover border-2 border-zinc-100 dark:border-darkBorder"
                          />
                        ))}
                        {task?.taskAttachmentUsers.length === 0 && (
                          <div className="text-xs text-red-500 flex  items-center lg:gap-x-2 gap-x-1">
                            <FiAlertCircle />
                            Kullanıcı Atanmamış
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-x-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs  ${
                            task.taskImportance === "low" &&
                            "bg-zinc-100 text-zinc-400 border border-zinc-300 dark:bg-darkBox dark:border-darkBorder"
                          }
                          ${
                            task.taskImportance === "normal" &&
                            "bg-orange-100 text-orange-400 border border-orange-500 dark:bg-orange-500 dark:text-orange-100"
                          }
                          ${
                            task.taskImportance === "high" &&
                            "bg-red-100 text-red-400 border border-red-500 dark:bg-red-500 dark:text-red-100"
                          }`}
                        >
                          {task.taskImportance === "low" && "Düşük"}
                          {task.taskImportance === "normal" && "Normal"}
                          {task.taskImportance === "high" && "Yüksek"}
                        </span>
                        <button
                          onClick={() => openModal(task)}
                          className=" text-zinc-700 text-2xl hover:text-zinc-900 dark:hover:text-darkText rounded-full"
                        >
                          <IoMenu />
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:h-full h-[100px] overflow-auto break-words">
                      <span className="dark:text-white">
                        {task.text.slice(0, 300)}...
                      </span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className="bg-zinc-100 dark:bg-darkBox dark:border-darkBorder rounded-xl border shadow">
            <div className="w-full rounded-t-xl bg-gradient-to-r from-green-500 to-zinc-700  p-4 border-b dark:border-darkBorder">
              <h1 className="text-lg text-white font-semibold flex gap-x-1 items-center">
                <RiCheckboxCircleLine size={20} />
                Tamamlandı
              </h1>
            </div>
            <div
              className="w-full  p-3 flex flex-col gap-y-2 max-h-[650px] overflow-y-auto"
              ref={animationParent}
            >
              {currentProject?.tasks?.map((task) => {
                return task.status === "Tamamlandı" ? (
                  <div
                    key={task.taskID}
                    className="bg-white dark:bg-darkPrimary dark:border-darkBorder p-5 border rounded-md text-sm flex flex-col items-start justify-start gap-2 overflow-hidden min-h-32"
                  >
                    <div className="flex gap-x-2 items-center justify-between w-full border-b dark:border-darkBorder pb-2">
                      <div className="flex items-center gap-x-1 -space-x-3 ">
                        {task?.taskAttachmentUsers.map((user) => (
                          <img
                            key={user.uid}
                            data-tooltip-id="username"
                            data-tooltip-content={user.username}
                            src={user?.photoURL ? user.photoURL : Avatar}
                            className="w-7 h-7 rounded-full object-cover border-2 border-zinc-100 dark:border-darkBorder"
                          />
                        ))}
                        {task?.taskAttachmentUsers.length === 0 && (
                          <div className="text-xs text-red-500 flex  items-center lg:gap-x-2 gap-x-1">
                            <FiAlertCircle />
                            Kullanıcı Atanmamış
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-x-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs  ${
                            task.taskImportance === "low" &&
                            "bg-zinc-100 text-zinc-400 border border-zinc-300 dark:bg-darkBox dark:border-darkBorder"
                          }
                          ${
                            task.taskImportance === "normal" &&
                            "bg-orange-100 text-orange-400 border border-orange-500 dark:bg-orange-500 dark:text-orange-100"
                          }
                          ${
                            task.taskImportance === "high" &&
                            "bg-red-100 text-red-400 border border-red-500 dark:bg-red-500 dark:text-red-100"
                          }`}
                        >
                          {task.taskImportance === "low" && "Düşük"}
                          {task.taskImportance === "normal" && "Normal"}
                          {task.taskImportance === "high" && "Yüksek"}
                        </span>
                        <button
                          onClick={() => openModal(task)}
                          className=" text-zinc-700 text-2xl hover:text-zinc-900 dark:hover:text-darkText rounded-full"
                        >
                          <IoMenu />
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:h-full h-[100px] overflow-auto break-words">
                      <span className="dark:text-white">
                        {task.text.slice(0, 300)}...
                      </span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
