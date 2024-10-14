import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { db } from "~/firebase/firebase";

const CreateTeam = () => {
  const { register, handleSubmit, reset } = useForm();

  const { user } = useSelector((state) => state.user);

  const createTeam = async (data) => {
    try {
      const teamNameTrimmed = data.teamName.trim();

      if (!teamNameTrimmed) {
        toast.error("Takım adı boş olamaz!");
        return;
      }

      const newTeamRef = doc(collection(db, "teams"));
      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);

      if (
        userDoc.data().teams.length >= 1 &&
        userDoc.data().premium === false
      ) {
        toast.error(
          "Daha fazla takım oluşturamazsınız! Premium üyesi olarak bu sayıyı 5'e çıkartabilirsiniz."
        );
        return;
      }

      if (userDoc.data().premium === true && userDoc.data().teams.length >= 5) {
        toast.error("Daha fazla takım oluşturamazsınız!");
        return;
      }

      const teamData = {
        teamID: newTeamRef.id,
        teamName: teamNameTrimmed,
        teamCreaterID: user.uid,
        teamMembers: [],
        teamProjects: [],
      };

      await setDoc(newTeamRef, teamData);
      await updateDoc(userRef, {
        teams: arrayUnion(newTeamRef.id),
      });

      toast.success("Başarıyla takım oluşturuldu!");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-grow justify-start items-start w-full container mx-auto mt-24 flex-col gap-y-4">
      <h1 className="text-5xl font-semibold text-primary">Takım Oluştur</h1>
      <p className="text-sm text-zinc-700">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias velit
        deserunt numquam saepe consequatur cumque, illo, quaerat dolores
        molestiae officiis exercitationem fugit iusto eius soluta earum
        assumenda aliquid eos. Itaque minus accusantium ad quis velit! Ea facere
        deleniti tempora nihil sed ut, nam iste eaque rerum beatae ipsam quas
        tenetur?
      </p>
      <form
        className="w-1/2 flex items-center gap-x-5"
        onSubmit={handleSubmit(createTeam)}
      >
        <input
          type="text"
          className="w-full border bg-white rounded-md px-4 py-2 outline-none"
          placeholder="Takım adı..."
          {...register("teamName", { required: true })}
        />
        <button className="bg-primary text-lg text-white px-6 py-3 flex justify-center items-center rounded-md">
          <IoMdAdd />
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
