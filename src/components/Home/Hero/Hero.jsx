const Hero = () => {
  return (
    <div className="h-[400px] bg-banner-hero bg-no-repeat bg-cover bg-center w-full flex justify-center items-center flex-col">
      <div className="w-2/3 flex justify-center items-center flex-col gap-y-6">
        <h1 className="text-white text-[40px] font-bold text-center">
          goalBoard ile Hedeflerinize Ulaşmak Artık Çok Kolay!
        </h1>
        <p className="text-white text-center text-lg">
          Projelerinizi ve hedeflerinizi daha verimli yönetmek için goalBoard'u
          kullanın. Takımınızı organize edin, hedefler belirleyin ve her aşamayı
          kolayca takip edin. İster bireysel çalışın, ister ekibinizle birlikte
          büyük projeleri yönetin, goalBoard sayesinde her şey kontrolünüz
          altında. Hedeflerinizi bir adım öteye taşımanın zamanı geldi!
        </p>
        <button className="px-4 py-2 rounded-full text-lg bg-white text-base font-semibold">
          Detaylara Git
        </button>
      </div>
    </div>
  );
};

export default Hero;
