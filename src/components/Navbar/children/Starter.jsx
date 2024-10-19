import { Link } from "react-router-dom";
import { starterTabs } from "~/data/data";

const Starter = () => {
  return (
    <div className="py-2.5 px-4 border-b bg-white border-neutral-300 flex  items-center justify-between ">
      <div className="flex gap-x-2 items-center">
        <h1 className="px-3 py-0.5 text-xs lg:text-sm rounded-md bg-green-100 text-green-500 uppercase font-extrabold">
          yakında
        </h1>
        <p className="lg:text-sm lg:flex hidden text-xs text-neutral-500 font-medium">
          Yakında son sürüm ile karşınızda olacağız.
        </p>
      </div>
      <div className="flex  gap-x-3">
        {starterTabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.to}
            className="lg:text-sm text-xs text-neutral-500 font-medium hover:text-neutral-400"
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Starter;
