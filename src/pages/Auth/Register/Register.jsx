import RegisterSVG from "~/assets/Register/Register.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterInput } from "~/data/data";
import { registerScheme } from "~/validation/scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { registerService } from "~/redux/slices/userSlice";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerScheme),
  });
  const dispatch = useDispatch();

  const registerHandle = (data) => {
    try {
      dispatch(registerService(data));
      toast.success("Kayıt başarılı");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto  bg-white border rounded-xl p-5 flex shadow-lg">
      <div className="w-[60%] flex flex-col gap-y-6 items-start justify-start p-12">
        <div className="flex flex-col gap-y-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base">
            Kayıt Ol
          </h1>
          <p className="text-zinc-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            delectus earum unde incidunt voluptate at. Veritatis dolorem
            consectetur mollitia assumenda soluta dolor maxime, iure sint.
          </p>
        </div>
        <form
          className="w-full grid grid-cols-1 "
          onSubmit={handleSubmit(registerHandle)}
        >
          {RegisterInput.map((input) => (
            <p key={input.id} className="flex flex-col gap-y-2">
              <input
                type={input.type}
                className={`px-4 py-2 rounded-md border outline-none `}
                placeholder={input.placeholder}
                {...register(input.name, { required: true })}
              />
              <span className="text-xs text-red-500 py-2">
                {errors[input.name] && errors[input.name].message}
              </span>
            </p>
          ))}

          <Link to="/login" className="text-base font-semibold underline pb-3">
            Hesabın var mı ?
          </Link>
          <button className="px-4 py-2 rounded-md bg-base text-white font-semibold border border-transparent hover:border hover:border-base hover:bg-white hover:text-base">
            Kayıt ol
          </button>
        </form>
      </div>
      <div className="w-[40%] flex justify-center items-center ">
        <img src={RegisterSVG} className="drop-shadow-xl w-[550px]" />
      </div>
    </div>
  );
};

export default Register;
