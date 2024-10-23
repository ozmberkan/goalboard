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

const Tasks = ({ projectID }) => {
  const { register, handleSubmit, reset } = useForm();
  const { currentProject } = useSelector((store) => store.projects);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectsByID(projectID));
  }, [dispatch]);

  const createTask = async (data) => {
    try {
      const projectRef = doc(db, "projects", projectID);

      const formattedDate = moment().format("DD.MM.YYYY HH:mm");

      const taskData = {
        taskID: nanoid(),
        text: data.task,
        date: formattedDate,
      };

      await updateDoc(projectRef, {
        tasks: arrayUnion(taskData),
      });

      toast.success("Başarıyla Eklendi");
      reset();
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
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div className="w-full h-[800px] grid grid-cols-3 gap-8">
      <div className="bg-neutral-100 rounded-xl border">
        <div className="w-full rounded-t-xl bg-primary  p-4 border-b border-zinc-500">
          <h1 className="text-xl text-white font-semibold">Yapılacaklar</h1>
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
              <button className="px-4 py-1 rounded-md bg-primary text-white">
                Ekle
              </button>
            </form>
          </div>
        </div>
        <hr />
        <div className="w-full  p-3 flex flex-col gap-y-2">
          {currentProject?.tasks?.map((task) => (
            <div
              key={task.taskID}
              className="bg-white px-4 py-2 border rounded-md text-sm flex justify-between items-center"
            >
              <span>{task.text}</span>
              <div className="flex gap-x-2">
                <button
                  onClick={() => testToTask(task.taskID)}
                  className="bg-zinc-700 text-white px-2 py-1 rounded-md"
                >
                  <MdOutlineSettings />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-neutral-100 rounded-xl border">
        <div className="w-full rounded-t-xl bg-violet-500  p-4 border-b">
          <h1 className="text-xl text-white font-semibold">Test Aşamasında</h1>
        </div>
        <div className="w-full  p-3 flex flex-col gap-y-2">
          {currentProject?.testTasks?.map((task) => (
            <div
              key={task.taskID}
              className="bg-white px-4 py-2 border rounded-md text-sm flex justify-between items-center"
            >
              <span>{task.text}</span>
              <div className="flex gap-x-2">
                <button
                  onClick={() => completeToTask(task.taskID)}
                  className="bg-green-100 text-green-500 px-2 py-1 rounded-md"
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-neutral-100 rounded-xl border">
        <div className="w-full rounded-t-xl bg-green-500  p-4 border-b">
          <h1 className="text-xl text-white font-semibold">Tamamlandı</h1>
        </div>
        <div className="w-full  p-3 flex flex-col gap-y-2">
          {currentProject?.completeTasks?.map((task) => (
            <div
              key={task.taskID}
              className="bg-white px-4 py-2 border rounded-md text-sm flex justify-between items-center"
            >
              <span>{task.text}</span>
              <div className="flex gap-x-2">
                <button
                  onClick={() => deleteCompletedTask(task.taskID)}
                  className="bg-red-100 text-red-500 px-2 py-1 rounded-md"
                >
                  <MdCancel />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
