const Announcements = () => {
  return (
    <div className="flex-grow p-4 flex ">
      <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative  overflow-hidden">
        <h1 className="text-4xl font-bold text-primary ">Duyurular</h1>
        <p className="font-medium text-lg text-zinc-700">
          Merhaba GoalBoard kullanıcıları! Sizlerle heyecan verici gelişmeleri
          paylaşmaktan büyük mutluluk duyuyoruz! Yakın zamanda GoalBoard'un tam
          sürümünü kullanıma sunacağız. Şu an sizlerle paylaştığımız beta
          sürümüyle aldığımız geri bildirimler, platformumuzu daha stabil ve
          işlevsel hale getirmemize yardımcı oldu. Full sürümde, daha iyi bir
          kullanıcı deneyimi sunmak için pek çok yenilik ve geliştirme sizleri
          bekliyor.
        </p>
        <div className="py-2 w-full lg:flex grid grid-cols-1 gap-5">
          <p className="bg-orange-100 text-orange-500 rounded-md font-semibold  text-sm px-4 py-2 ">
            Görev atama süreçleri daha hızlı ve sezgisel hale getiriliyor
          </p>
          <p className="bg-red-100 text-red-500 rounded-md  font-semibold text-sm px-4 py-2 ">
            Mobil uyum süreci devam ediyor
          </p>
          <p className="bg-blue-100 text-blue-500 rounded-md font-semibold  text-sm px-4 py-2 ">
            Performans ve stabilite üzerinde çalışıyoruz
          </p>
          <p className="bg-violet-100 text-violet-500 rounded-md font-semibold  text-sm px-4 py-2 ">
            Kullanıcı arayüzü iyileştirmeleri devam ediyor
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
