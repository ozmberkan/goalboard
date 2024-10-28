import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLock,
  FaTwitter,
  FaUser,
} from "react-icons/fa";

import { MdNotificationAdd } from "react-icons/md";

import { TbSettingsFilled } from "react-icons/tb";

export const starterTabs = [
  { id: 1, label: "İletişim", to: "/contacts" },
  { id: 2, label: "Hakkımızda", to: "/about" },
  { id: 3, label: "Premium", to: "/pricing" },
];

export const navTabs = [
  { id: 1, label: "Premium", to: "/pricing" },
  { id: 2, label: "Duyurular", to: "/announcements" },
  { id: 3, label: "Neden Biz?", to: "/why-us" },
];

export const profileTabs = [
  { id: 1, label: "Profilim", to: "/profile", icon: FaUser },
  {
    id: 2,
    label: " Bildirimler",
    to: "/invites",
    icon: MdNotificationAdd,
  },
  { id: 3, label: "Ayarlar", to: "/settings", icon: TbSettingsFilled },
];

export const FooterSocialTabs = [
  { id: 1, icon: FaFacebook },
  { id: 2, icon: FaTwitter },
  { id: 3, icon: FaInstagram },
  { id: 4, icon: FaLinkedin },
];

export const FooterQuickLinks = [
  { id: 1, label: "Neden Biz?", to: "/why-us" },
  { id: 4, label: "Hakkımızda", to: "/about" },
  { id: 2, label: "Hizmetler", to: "/services" },
  { id: 3, label: "İletişim", to: "/contacts" },
];

export const FooterContacts = [
  { id: 1, label: "123 Hedef Sokak" },
  { id: 2, label: "34000 İzmir, Türkiye" },
  { id: 3, label: "Email: info@goalborad.com" },
  { id: 4, label: "Tel: +90 (212) 123 4567" },
];

export const ContactsInput = [
  { id: 1, placeholder: "Adınız", name: "name", type: "text" },
  { id: 2, placeholder: "Cep Telefonu", name: "phone", type: "text" },
  {
    id: 3,
    placeholder: "Kullanıcı Adı (Opsiyonel)",
    name: "username",
    type: "text",
  },
  { id: 4, placeholder: "Mesajınız", name: "message" },
];

export const FeedBacksInput = [
  { id: 1, placeholder: "Kullanıcı Adınız", name: "username", type: "text" },
  { id: 2, placeholder: "Takım Adınız", name: "teamName", type: "text" },
  { id: 3, placeholder: "Proje Adınız", name: "projectName", type: "text" },
  { id: 4, placeholder: "Mesajınız", name: "message" },
];

export const SignInInput = [
  {
    id: 1,
    placeholder: "E-Posta Giriniz..",
    name: "email",
    type: "text",
    icon: FaEnvelope,
  },
  {
    id: 2,
    placeholder: "Parola Giriniz..",
    name: "password",
    type: "password",
    icon: FaLock,
  },
];
export const SignUpInput = [
  {
    id: 1,
    placeholder: "Kullanıcı Adı Giriniz..",
    name: "username",
    type: "text",
    icon: FaUser,
  },
  {
    id: 2,
    placeholder: "E-Posta Giriniz..",
    name: "email",
    type: "email",
    icon: FaEnvelope,
  },
  {
    id: 3,
    placeholder: "Parola Giriniz..",
    name: "password",
    type: "password",
    icon: FaLock,
  },
];

export const SignInButtons = [
  { id: 1, label: "Hesabın yok mu ?", to: "/signup" },
  { id: 2, label: "Parolamı Unuttum", to: "/forgot-password" },
];

export const pricingCards = [
  {
    id: 1,
    label: "Silver",
    price: "Ücretsiz",
    features: [
      "1 Takım Oluşturma",
      "5 Kişiye Kadar Takım Daveti",
      "Sınırsız Görev Yönetimi",
      "Yorum Yapabilme",
      "Takvim Entegrasyonu",
    ],
  },
  {
    id: 2,
    label: "Gold",
    price: "49₺",
    features: [
      "3 Takım Oluşturma",
      "7 Kişiye Kadar Takım Daveti",
      "Sınırsız Görev ve Proje Yönetimi",
      "Yorum Yapabilme",
      "Takvim Entegrasyonu",
      "E-posta Desteği",
      "Rozet",
    ],
  },
  {
    id: 3,
    label: "Platinum",
    price: "99₺",
    features: [
      "5 Takım Oluşturma",
      "10 Kişiye Kadar Takım Daveti",
      "Sınırsız Görev, Proje ve Dosya Yönetimi",
      "Yorum Yapabilme",
      "Takvim Entegrasyonu",
      "Özel Destek",
      "E-posta ve Canlı Sohbet Desteği",
      "Rozet",
    ],
  },
];

export const adminUserInputs = [
  {
    id: 1,
    label: "Yetki",
    name: "role",
    type: "select",
  },
  {
    id: 2,
    label: "Kullanıcı Adı",
    name: "username",
    type: "text",
  },
  { id: 3, label: "E-Posta", name: "email", type: "email" },
  { id: 4, label: "Profil Fotoğrafı", name: "photoURL", type: "text" },
];

export const serviceData = [
  {
    id: 1,
    title: "Hizmetlerimiz",
    description:
      "GoalBoard olarak, projelerinizi başarıya ulaştırmanıza yardımcı olmak için çeşitli hizmetler sunuyoruz. İster küçük bir ekip yönetin, ister büyük bir proje üzerinde çalışıyor olun, ihtiyaçlarınıza uygun esnek çözümler sunuyoruz.",
  },
  {
    id: 2,
    title: "Görev Yönetimi",
    description:
      "Proje görevlerinizi kolayca atayın, takip edin ve tamamlayın. Görevler arası geçişi hızlı ve sorunsuz hale getiriyoruz.",
  },
  {
    id: 3,
    title: "Zaman Takibi",
    description:
      "Zaman çizelgeleri ve süre takibi ile ekiplerinizi daha verimli yönetin. Her görev ve projede harcanan zamanı kolayca takip edin.",
  },
  {
    id: 4,
    title: "Ekip İş Birliği",
    description:
      "Ekipleriniz arasında etkili bir iletişim ve iş birliği ortamı sağlayarak verimliliği artırıyoruz. Gerçek zamanlı güncellemeler ve yorumlarla projeleriniz her an kontrol altında.",
  },
  {
    id: 5,
    title: "Raporlama ve Analiz",
    description:
      "Projelerinizin ilerlemesini detaylı raporlarla analiz edin ve stratejik kararlar alın. Ekibinizin performansını ölçmek artık daha kolay.",
  },
  {
    id: 6,
    description:
      "Hedeflerinize ulaşmanız için sunduğumuz bu hizmetler ile projelerinizi daha etkili bir şekilde yönetebilirsiniz. İhtiyaçlarınıza uygun çözümlerle her zaman yanınızdayız.",
  },
];

export const aboutData = [
  {
    id: 1,
    title: "Hakkımızda",
    description:
      "goalBoard, projelerinizi daha verimli bir şekilde yönetmenize yardımcı olmak için geliştirilmiş, modern ve kullanıcı dostu bir proje yönetim platformudur. Amacımız, ekiplerin hedeflerine ulaşmasını kolaylaştıran, iş birliğini artıran ve üretkenliği teşvik eden bir ortam yaratmaktır.",
  },
  {
    id: 2,
    description:
      "Yılların birikimi ve uzmanlığı ile, proje yönetiminde karşılaşılan zorlukları yakından gözlemledik. Bu deneyimlerden yola çıkarak, proje süreçlerinizi sadeleştiren ve hedeflerinize daha hızlı ulaşmanıza olanak sağlayan bir platform oluşturduk. Görev yönetimi, ekip iş birliği, zaman takibi ve gerçek zamanlı güncellemeler gibi özellikler ile projeleriniz her an kontrolünüz altında olacak.",
  },
  {
    id: 3,
    description:
      "goalBoard, iş yerinde ve ekip içinde daha fazla şeffaflık ve iletişim sağlayarak iş akışlarını optimize eder. Bizim için öncelik, her kullanıcının projelerini en verimli şekilde yönetebilmesi ve ekiplerin hedeflerine başarıyla ulaşmasıdır.",
  },
  {
    id: 4,
    description:
      "Kullanıcılarımızın geri bildirimlerini ve ihtiyaçlarını her zaman ön planda tutarak sürekli gelişen bir platform sunuyoruz. Yalnızca bugün değil, gelecekte de sizlere en iyi hizmeti sunmak ve iş süreçlerinizi kolaylaştırmak için buradayız.",
  },
  {
    id: 5,
    title: "Misyonumuz",
    description:
      "Proje yönetimini herkes için daha erişilebilir, etkili ve keyifli hale getirmek.",
  },
  {
    id: 6,
    title: "Vizyonumuz",
    description:
      "Tüm dünyadaki ekiplerin hedeflerine ulaşmasına yardımcı olan en güvenilir ve yenilikçi proje yönetim aracı olmak.",
  },
];

export const adminDashboard = [
  { id: 1, label: "Kullanıcı Sayısı", key: "users" },
  { id: 2, label: "Takım Sayısı", key: "teams" },
  { id: 3, label: "Proje Sayısı", key: "projects" },
  { id: 4, label: "Geribildirim Sayısı", key: "feedbacks" },
];
