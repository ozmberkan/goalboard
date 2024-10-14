import { MdVerified } from "react-icons/md";

const Premium = () => {
  return (
    <div className="w-full flex justify-center items-start p-12">
      <div className="bg-white p-4 rounded-md border w-full h-[300px] flex relative overflow-hidden">
        <MdVerified className="absolute -right-24 -top-5 -rotate-[15deg] text-[400px] text-base/75 drop-shadow-2xl z-0" />
        <div className="w-[80%] p-3 flex flex-col gap-y-5 z-10">
          <h1 className="text-4xl font-bold">Premium Avantajları</h1>
          <p className="text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            aliquam praesentium, rem ullam ducimus delectus provident.
            Laudantium asperiores quos odio deserunt! Repellat aut dicta
            quibusdam sapiente repudiandae expedita? Sit voluptatum voluptas
            atque consequatur iusto. Incidunt eligendi, vero nemo laborum alias
            magni corporis doloremque eos eveniet, dolores provident id impedit
            quaerat.
          </p>
          <div className="w-full flex justify-start items-center gap-x-5">
            <div className="px-6 py-2 rounded-md bg-baseDark text-white">
              250+ Kullanıcı
            </div>
            <div className="px-6 py-2 rounded-md bg-baseDark text-white">
              50+ Takım
            </div>
            <div className="px-6 py-2 rounded-md bg-baseDark text-white">
              100+ Proje
            </div>
            <button className="px-4 py-2 rounded-md bg-base text-white font-semibold border border-transparent hover:border hover:border-base hover:bg-white hover:text-base">
              Premium'a geç!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
