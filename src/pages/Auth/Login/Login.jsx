import RegisterSVG from "~/assets/Register/Register.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginScheme } from "~/validation/scheme";
import { LoginInput } from "~/data/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginService } from "~/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginScheme),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandle = async (data) => {
    try {
      dispatch(loginService(data));

      toast.success("Giriş başarılı");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto bg-white border rounded-xl p-5 flex shadow-lg">
      <div className="w-[40%] flex justify-center items-center ">
        <img src={RegisterSVG} className="drop-shadow-xl w-[550px]" />
      </div>
      <div className="w-[60%]  flex flex-col gap-y-5 items-start justify-start p-12">
        <div className="flex flex-col gap-y-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            Giriş Yap
          </h1>

          <p className="text-zinc-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            delectus earum unde incidunt voluptate at. Veritatis dolorem
            consectetur mollitia assumenda soluta dolor maxime, iure sint.
          </p>
        </div>
        <form
          className="w-full grid grid-cols-1 gap-3"
          onSubmit={handleSubmit(loginHandle)}
        >
          {LoginInput.map((input) => (
            <p key={input.id} className="flex flex-col gap-y-1">
              <input
                type={input.type}
                className={`px-4 py-2 rounded-md border outline-none`}
                placeholder={input.placeholder}
                {...register(input.name, { required: true })}
              />
              <span className="text-xs text-red-500 py-2">
                {errors[input.name] && errors[input.name].message}
              </span>
            </p>
          ))}
          <Link
            to="/register"
            className="text-primary font-semibold underline pb-3"
          >
            Henüz kayıt olmadın mı?
          </Link>
          <button className="px-4 py-2 rounded-md bg-primary text-white font-semibold border border-transparent hover:border hover:border-base hover:bg-white hover:text-base">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
