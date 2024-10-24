import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLock,
  FaTwitter,
  FaUser,
} from "react-icons/fa";

import { MdNotificationsActive } from "react-icons/md";
import { TbSettingsFilled } from "react-icons/tb";

export const starterTabs = [
  { id: 1, label: "İletişim", to: "/contacts" },
  { id: 2, label: "Hakkımızda", to: "/about" },
];

export const navTabs = [
  { id: 1, label: "Fiyatlandırma", to: "/pricing" },
  { id: 2, label: "Duyurular", to: "/announcements" },
  { id: 3, label: "Neden Varız?", to: "/why-us" },
];

export const profileTabs = [
  { id: 1, label: "Profilim", to: "/profile", icon: FaUser },
  {
    id: 2,
    label: "Gelen Davetler",
    to: "/invites",
    icon: MdNotificationsActive,
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
  { id: 2, placeholder: "Proje Adınız", name: "projectName", type: "text" },
  { id: 3, placeholder: "Mesajınız", name: "message" },
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
