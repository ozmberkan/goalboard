import React from "react";

const Services = () => {
  return (
    <div className="flex-grow p-4 flex">
      <div className="w-full border bg-white rounded-md p-8 flex flex-col gap-y-4 relative z-10 overflow-hidden">
        <h1 className="text-4xl font-bold text-primary ">Hizmetlerimiz</h1>
        <p className="font-medium text-lg text-zinc-700">
          GoalBoard olarak, projelerinizi başarıya ulaştırmanıza yardımcı olmak
          için çeşitli hizmetler sunuyoruz. İster küçük bir ekip yönetin, ister
          büyük bir proje üzerinde çalışıyor olun, ihtiyaçlarınıza uygun esnek
          çözümler sunuyoruz.
        </p>
        <p className="font-medium text-lg text-zinc-700">
          <strong>1. Görev Yönetimi:</strong> Proje görevlerinizi kolayca
          atayın, takip edin ve tamamlayın. Görevler arası geçişi hızlı ve
          sorunsuz hale getiriyoruz.
        </p>
        <p className="font-medium text-lg text-zinc-700">
          <strong>2. Zaman Takibi:</strong> Zaman çizelgeleri ve süre takibi ile
          ekiplerinizi daha verimli yönetin. Her görev ve projede harcanan
          zamanı kolayca takip edin.
        </p>
        <p className="font-medium text-lg text-zinc-700">
          <strong>3. Ekip İş Birliği:</strong> Ekipleriniz arasında etkili bir
          iletişim ve iş birliği ortamı sağlayarak verimliliği artırıyoruz.
          Gerçek zamanlı güncellemeler ve yorumlarla projeleriniz her an kontrol
          altında.
        </p>
        <p className="font-medium text-lg text-zinc-700">
          <strong>4. Raporlama ve Analiz:</strong> Projelerinizin ilerlemesini
          detaylı raporlarla analiz edin ve stratejik kararlar alın. Ekibinizin
          performansını ölçmek artık daha kolay.
        </p>
        <p className="font-medium text-lg text-zinc-700">
          Hedeflerinize ulaşmanız için sunduğumuz bu hizmetler ile projelerinizi
          daha etkili bir şekilde yönetebilirsiniz. İhtiyaçlarınıza uygun
          çözümlerle her zaman yanınızdayız.
        </p>
      </div>
    </div>
  );
};

export default Services;
