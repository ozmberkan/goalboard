import { MdVerified } from "react-icons/md";
import { statistics } from "~/data/data";

const Premium = () => {
  return (
    <div className="w-full flex justify-center items-start p-12">
      <div className="bg-white p-4 rounded-md border w-full h-[300px] flex relative overflow-hidden">
        <MdVerified className="absolute -right-24 -top-5 -rotate-[15deg] text-[400px] text-primary/75 drop-shadow-2xl z-0" />
        <div className="w-[80%] p-3 flex flex-col gap-y-5 z-10">
          <h1 className="text-4xl font-bold">Premium Avantajları</h1>
          <p className="text-zinc-400">
            Premium üyelikle çok daha fazlasını yapabilirsiniz! Normal
            kullanıcılar yalnızca bir takım oluşturabilirken, Premium üyeler beş
            farklı takım oluşturma hakkına sahip. Ayrıca, normal kullanıcılar
            takımlarına yalnızca 5 kişiyi davet edebilirken, Premium
            kullanıcılar bu sayıyı 10 kişiye kadar çıkarabilir. Bu sayede
            projelerinizi daha geniş bir ekiple yönetebilir ve hedeflerinize
            daha hızlı ulaşabilirsiniz. Premium üyeliğin sunduğu bu
            avantajlarla, projelerinizi daha esnek ve kapsamlı bir şekilde
            yönetmek için hemen yükseltin!
          </p>
          <div className="w-full flex justify-start items-center gap-x-5">
            {statistics.map((stat) => (
              <div
                key={stat.id}
                className="px-6 py-2 rounded-md bg-primaryDark text-white"
              >
                {stat.label}
              </div>
            ))}
            <button className="px-4 py-2 rounded-md bg-primary text-white font-semibold border border-transparent hover:border hover:border-primary hover:bg-white hover:text-primary">
              Premium'a geç!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
