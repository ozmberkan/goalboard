import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const About = () => {
  return (
    <div className="flex flex-grow justify-start items-start w-full border container mx-auto rounded-md bg-white p-8 flex-col gap-y-4">
      <h1 className="text-primary text-4xl font-semibold">Hakkımızda</h1>

      <p className="text-zinc-500 text-base">
        GoalBoard, ekiplerin hedeflerini belirlemelerine, bu hedeflere ulaşmak
        için birlikte çalışmasına ve organize olmalarına yardımcı olmak amacıyla
        geliştirilmiş yenilikçi bir proje yönetim platformudur. Ekibinizin
        potansiyelini en üst düzeye çıkarmak için tasarlanan GoalBoard,
        kullanıcı dostu arayüzü ve esnek işlevleriyle işbirliğini kolaylaştırır.
      </p>

      <p className="text-zinc-500 text-base">
        GoalBoard'da her proje bir hedefle başlar. Takım üyeleri, belirlenen
        hedeflere ulaşmak için projeleri adım adım yönetirken, ilerlemeyi
        kolayca takip edebilir ve paylaşılan görevlerle herkesin aynı hedefe
        odaklanmasını sağlayabilirler. İster küçük bir ekip, ister büyük bir
        organizasyon olun, GoalBoard her boyuttaki takıma uyum sağlayacak
        esneklik sunar.
      </p>

      <p className="text-zinc-500 text-base">
        Platformumuz, kullanıcıların projelerine ekip üyeleri atamalarına,
        görevleri paylaşmalarına, görevler üzerinde yorum yapmalarına ve
        belirlenen son teslim tarihlerini yönetmelerine olanak tanır.
        GoalBoard’da kullanıcılar, kişisel ve profesyonel projeleri için
        stratejik planlama yapabilir, ekiplerini organize edebilir ve
        hedeflerine ulaşmak için bir yol haritası oluşturabilirler.
      </p>

      <p className="text-zinc-500 text-base">
        Ayrıca, premium kullanıcılar için sunduğumuz gelişmiş özellikler
        sayesinde, birden fazla takım yönetimi, daha geniş katılımcı kapasitesi
        ve detaylı analiz seçenekleriyle iş süreçlerinizi daha verimli hale
        getirebilirsiniz. Esnek yapımız, her ekip için özelleştirilebilir bir
        deneyim sunarak proje yönetimini daha etkili ve eğlenceli bir hale
        getirir.
      </p>

      <p className="text-zinc-500 text-base">
        GoalBoard olarak amacımız, kullanıcılarımızın projelerini daha etkili
        yönetmelerine yardımcı olurken, ekip içi iletişimi güçlendirmek ve
        hedeflere ulaşmayı kolaylaştırmaktır. Bizimle birlikte siz de
        hedeflerinize ulaşmanın kolay ve eğlenceli yolunu keşfedin!
      </p>
      <div className="flex gap-6 mt-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-2xl text-blue-600 hover:text-blue-800 transition" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-2xl text-black hover:text-black/50 transition" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-2xl text-pink-600 hover:text-pink-800 transition" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-2xl text-blue-700 hover:text-blue-900 transition" />
        </a>
      </div>
    </div>
  );
};

export default About;
