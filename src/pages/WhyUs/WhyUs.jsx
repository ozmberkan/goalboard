import React from "react";
import { Link } from "react-router-dom";
import Case from "~/assets/case.png";

const WhyUs = () => {
  return (
    <div className="flex-grow p-4 flex ">
      <div className="w-full border bg-white dark:bg-darkBox dark:border-darkBorder rounded-md p-8 flex flex-col gap-y-4 relative lg:z-10 overflow-hidden transition-all duration-500">
        <h1 className="text-4xl font-bold text-primary ">Neden goalBoard?</h1>
        <p className="font-medium text-lg text-zinc-700 dark:text-darkText">
          GoalBoard, ekiplerin hedeflerine ulaşmalarını kolaylaştırmak için
          tasarlanmış bir proje yönetim platformudur. Biz, iş birliğini ve
          üretkenliği artıran, kullanıcı dostu araçlar sunarak projelerinizi
          zamanında ve etkili bir şekilde tamamlamanıza yardımcı olmayı
          hedefliyoruz. Her adımda inovasyonu destekleyerek, ekibinizle birlikte
          başarıya ulaşmanız için en iyi çözümleri sunuyoruz. İşlerinizi
          kolaylaştırmak, projelerinizi hızlandırmak ve hedeflerinize
          odaklanmanızı sağlamak için buradayız. Hemen ücretsiz deneyin!
        </p>
        <div className="flex">
          <Link
            to="/signup"
            className="bg-primary hover:bg-primaryDark border border-transparent dark:border-darkBorder dark:hover:text-darkText dark:hover:bg-darkPrimary transition-colors duration-300 text-white px-4 py-2  rounded-md"
          >
            Hemen Başla!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
