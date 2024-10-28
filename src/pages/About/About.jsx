import { aboutData } from "~/data/data";

const About = () => {
  return (
    <div className="flex-grow p-4 flex">
      <div className="w-full border bg-white dark:bg-darkBox dark:border-darkBorder transition-all duration-500 rounded-md p-8 flex flex-col gap-y-3 relative overflow-hidden">
        {aboutData.map((section) => (
          <div key={section.id}>
            {section.title && (
              <h1 className="lg:text-lg font-bold text-primary">
                {section.title}
              </h1>
            )}
            <p className="font-medium text-sm text-zinc-700 dark:text-darkText">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
