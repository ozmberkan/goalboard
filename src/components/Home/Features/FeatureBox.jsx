const FeatureBox = ({ feature }) => {
  const { title, description } = feature;

  return (
    <div className="w-full bg-gradient-to-tr  from-primary to-primaryDark  shadow-md justify-start items-start rounded-md p-5 flex flex-col gap-y-5 relative">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <p className="text-zinc-200 text-sm">{description}</p>
      <button className="px-4 py-2 rounded-md bg-white text-primary font-semibold border border-transparent hover:border hover:border-white hover:bg-primary hover:text-white">
        Detaylar
      </button>
    </div>
  );
};

export default FeatureBox;
