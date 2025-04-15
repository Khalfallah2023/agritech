import store from "../../../redux/store";
import { useSelector } from "react-redux";
export const getLanguage = () => {
  const language = useSelector((state) => state.language);
  return language;
};
export function getTitle() {
  const language = getLanguage();
  switch (language) {
    case "en":
      return "RESIDENCE";
      break;
    case "gr":
      return "WOHNEN";
      break;
    case "ar":
      return "السكن";
      break;
    case "fa":
      return "زندگی کردن";
      break;
    case "fr":
      return "HABITATION";
      break;
    case "ru":
      return "жилье";
      break;
    case "uk":
      return "проживання";
      break;
    default:
      break;
  }
}
export function pauschale() {
  const language = getLanguage();
  switch (language) {
    case "en":
      return "LUMP SUM FOR SOCIAL BENEFITS";
    case "ar":
      return "مبلغ ثابت للمساعدات الاجتماعية";
    case "fa":
      return "مبلغ ثابت برای کمک های اجتماعی";
    case "fr":
      return "FORFAIT POUR LES PRESTATIONS SOCIALES";
    case "ru":
      return "ФИКСИРОВАННАЯ СУММА ПО СОЦИАЛЬНЫМ ПОСОБИЯМ";
    case "uk":
      return "ФІКСОВАНА СУМА ДЛЯ СОЦІАЛЬНИХ ВИПЛАТ";
    case "de":
      return "PAUSCHALE BEI SOZIALLEISTUNGEN";
    default:
      return "Unknown translation";
  }
}

export function gebrauchte() {
  const language = getLanguage();
  switch (language) {
    case "en":
      return "USED FURNITURE";
    case "ar":
      return "أثاث مستعمل";
    case "fa":
      return "مبلمان کارکرده";
    case "fr":
      return "MEUBLES D'OCCASION";
    case "ru":
      return "ПОЛОВАЯ МЕБЕЛЬ";
    case "uk":
      return "ВЖИВАНИЙ МЕБЛІ";
    case "de":
      return "GEBRAUCHTE MÖBEL";
    default:
      return "Unknown translation";
  }
}

export function troedel() {
  const language = getLanguage();
  switch (language) {
    case "en":
      return "FLEA MARKET";
    case "ar":
      return "سوق البرغوث";
    case "fa":
      return "بازار چرت و پرت";
    case "fr":
      return "MARCHÉ AUX PUCES";
    case "ru":
      return "БЛИНТОВЫЙ РЫНОК";
    case "uk":
      return "БЛИНДИРНИЙ РИНОК";
    case "de":
      return "TRÖDELMARKT";
    default:
      return "Unknown translation";
  }
}
export function beratung() {
  const language = getLanguage();
  switch (language) {
    case "en":
      return "Consultation overview";
    case "ar":
      return "نظرة عامة على الاستشارة";
    case "fa":
      return "بررسی مشاوره";
    case "fr":
      return "Aperçu des consultations";
    case "ru":
      return "Обзор консультаций";
    case "uk":
      return "Огляд консультацій";
    case "de":
      return "Beratungsübersicht";
    default:
      return "Unknown translation";
  }
}
