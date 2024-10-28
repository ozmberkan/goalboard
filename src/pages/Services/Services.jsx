import { serviceData } from "~/data/data";

const Services = () => {
  return (
    <div className="flex-grow p-4 flex">
      <div className="w-full border bg-white dark:bg-darkBox dark:border-darkBorder rounded-md p-8 flex flex-col gap-y-4 relative overflow-hidden">
        {serviceData.map((service) => (
          <div key={service.id}>
            {service.title && (
              <h1 className="lg:text-lg font-bold text-zinc-900 dark:text-neutral-400">
                {service.title}
              </h1>
            )}
            <p className="font-medium text-sm text-zinc-700 dark:text-darkText">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
