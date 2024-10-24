import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { db } from "~/firebase/firebase";
import { getProjectsByID } from "~/redux/slices/projectsSlice";
import { MdOutlineSettings, MdCancel } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FiLayout } from "react-icons/fi";
import Avatar from "~/assets/noavatar.png";
import {
  RiCircleLine,
  RiCheckboxCircleLine,
  RiStopCircleLine,
} from "react-icons/ri";

const Tasks = ({ projectID }) => {
  const [animationParent] = useAutoAnimate();

  const { register, handleSubmit, reset } = useForm();
  const { currentProject } = useSelector((store) => store.projects);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      if (user?.uid) {
        dispatch(getProjectsByID(projectID));
      }
    }, 60000);
  }, [dispatch]);

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
        taskCreatorImage: user.photoURL,
        text: data.task,
        date: formattedDate,
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

  const testToTask = async (taskID) => {
    try {
      const projectRef = doc(db, "projects", projectID);

      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();

      const taskToMove = projectData.tasks.find(
        (task) => task.taskID === taskID
      );

      const updatedTasks = projectData.tasks.filter(
        (task) => task.taskID !== taskID
      );

      if (taskToMove) {
        await updateDoc(projectRef, {
          tasks: updatedTasks,
          testTasks: arrayUnion(taskToMove),
        });

        toast.success("Görev test aşamasına taşındı!");
        dispatch(getProjectsByID(projectID));
      } else {
        console.log("erorr");
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  const completeToTask = async (taskID) => {
    try {
      const projectRef = doc(db, "projects", projectID);

      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();

      const taskToMove = projectData.testTasks.find(
        (task) => task.taskID === taskID
      );

      const updatedTasks = projectData.testTasks.filter(
        (task) => task.taskID !== taskID
      );

      if (taskToMove) {
        await updateDoc(projectRef, {
          testTasks: updatedTasks,
          completeTasks: arrayUnion(taskToMove),
        });

        toast.success("Görev tamamlandı aşamasına taşındı!");
        dispatch(getProjectsByID(projectID));
      } else {
        console.log("erorr");
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  const deleteCompletedTask = async (taskID) => {
    try {
      const projectRef = doc(db, "projects", projectID);

      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();

      const updatedCompleteTasks = projectData.completeTasks.filter(
        (task) => task.taskID !== taskID
      );

      await updateDoc(projectRef, {
        completeTasks: updatedCompleteTasks,
      });

      toast.success("Tamamlanan görev başarıyla silindi!");
      dispatch(getProjectsByID(projectID));
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div className="h-full">
      <div className="w-full py-3 border-b mb-4">
        <h1 className="text-xl font-semibold flex items-center gap-x-1">
          <FiLayout />
          Genel Bakış
        </h1>
      </div>

      <div className="w-full grid grid-cols-3 gap-8">
        <div className="bg-zinc-100 rounded-xl border shadow">
          <div className="w-full rounded-t-xl bg-gradient-to-r from-primary to-zinc-700  p-4 border-b border-zinc-500">
            <h1 className="text-lg text-white font-semibold flex items-center gap-x-2">
              <RiCircleLine size={20} />
              Yapılacaklar
            </h1>
          </div>
          <div className="w-full  p-3 flex flex-col gap-y-2">
            <div className="bg-white px-4 py-2 border rounded-md text-sm flex justify-between items-center">
              <form
                className="w-full flex gap-x-1"
                onSubmit={handleSubmit(createTask)}
              >
                <input
                  type="text"
                  placeholder="Yapılacak gir.."
                  className="flex-1 outline-none"
                  {...register("task")}
                />
                <button className="px-4 py-1 rounded-md bg-primary text-white hover:bg-primaryDark transition-colors">
                  Ekle
                </button>
              </form>
            </div>
          </div>
          <hr />
          <div
            className="w-full  p-3 flex flex-col gap-y-2  max-h-[650px] overflow-y-auto"
            ref={animationParent}
          >
            {currentProject?.tasks?.map((task) => (
              <div
                key={task.taskID}
                className="bg-white px-4 py-2 border rounded-md text-sm flex justify-between items-center"
              >
                <div className="flex gap-x-2 items-center">
                  <img
                    src={
                      task?.taskCreatorImage ? task.taskCreatorImage : Avatar
                    }
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{task.text}</span>
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => testToTask(task.taskID)}
                    className="bg-zinc-700 text-zinc-300  hover:bg-zinc-600 px-2 py-1 rounded-md flex items-center gap-x-1"
                  >
                    <MdOutlineSettings />
                    Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-100 rounded-xl border shadow">
          <div className="w-full rounded-t-xl bg-gradient-to-r from-orange-500 to-zinc-700  p-4 border-b">
            <h1 className="text-lg text-white font-semibold flex gap-x-1 items-center">
              <RiStopCircleLine />
              Test Aşamasında
            </h1>
          </div>
          <div
            className="w-full  p-3 flex flex-col gap-y-2 max-h-[650px] overflow-y-auto"
            ref={animationParent}
          >
            {currentProject?.testTasks?.map((task) => (
              <div
                key={task.taskID}
                className="bg-white px-4 py-2 border rounded-md text-sm flex justify-between items-center"
              >
                <div className="flex gap-x-2 items-center">
                  <img
                    src={
                      task?.taskCreatorImage ? task.taskCreatorImage : Avatar
                    }
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{task.text}</span>
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => completeToTask(task.taskID)}
                    className="bg-green-500 text-green-200 px-2 py-1 rounded-md flex items-center gap-x-1 hover:bg-green-400"
                  >
                    <FaCheck />
                    Tamamlandı
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-100 rounded-xl border shadow">
          <div className="w-full rounded-t-xl bg-gradient-to-r from-green-500 to-zinc-700  p-4 border-b">
            <h1 className="text-lg text-white font-semibold flex gap-x-1 items-center">
              <RiCheckboxCircleLine size={20} />
              Tamamlandı
            </h1>
          </div>
          <div
            className="w-full  p-3 flex flex-col gap-y-2 max-h-[650px] overflow-y-auto"
            ref={animationParent}
          >
            {currentProject?.completeTasks?.map((task) => (
              <div
                key={task.taskID}
                className="bg-white px-4 py-2 border rounded-md text-sm flex justify-between items-center"
              >
                <div className="flex gap-x-2 items-center">
                  <img
                    src={
                      task?.taskCreatorImage ? task.taskCreatorImage : Avatar
                    }
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{task.text}</span>
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => deleteCompletedTask(task.taskID)}
                    className="bg-red-500 text-red-100 hover:bg-red-600 px-2 py-1 rounded-md flex items-center gap-x-1"
                  >
                    <MdCancel />
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;