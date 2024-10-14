import Features from "~/components/Home/Features/Features";
import Hero from "~/components/Home/Hero/Hero";
import Premium from "~/components/Home/Premium/Premium";

const Home = () => {
  return (
    <div className="w-full pb-5">
      <Hero />
      <Features />
      <Premium />
    </div>
  );
};

export default Home;
