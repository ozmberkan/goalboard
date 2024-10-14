const FeatureBox = ({ feature }) => {
  const { title, description } = feature;

  return (
    <div className="w-full  bg-base  shadow-md justify-start items-start rounded-md p-5 flex flex-col gap-y-5 relative">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <p className="text-zinc-200 text-sm">{description}</p>
      <button className="px-4 py-2 rounded-md bg-white text-base font-semibold border border-transparent hover:border hover:border-white hover:bg-base hover:text-white">
        Detaylar
      </button>
    </div>
  );
};

export default FeatureBox;
