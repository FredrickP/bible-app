import { BibleTranslation, BibleTranslationOption } from "../types/translation";

export const DEFAULT_TRANSLATION: BibleTranslation = "web";

export const bibleTranslationOptions: BibleTranslationOption[] = [
  {
    code: "web",
    label: "World English Bible",
    language: "English",
    description: "Modern public domain English translation",
  },
  {
    code: "kjv",
    label: "King James Version",
    language: "English",
    description: "Classic English Bible translation",
  },
  {
    code: "asv",
    label: "American Standard Version",
    language: "English",
    description: "Traditional English translation",
  },
  {
    code: "bbe",
    label: "Bible in Basic English",
    language: "English",
    description: "Simplified English translation",
  },
  {
    code: "darby",
    label: "Darby Bible",
    language: "English",
    description: "Darby English translation",
  },
  {
    code: "dra",
    label: "Douay-Rheims American Edition",
    language: "English",
    description: "Traditional Catholic English translation",
  },
  {
    code: "ylt",
    label: "Young's Literal Translation",
    language: "English",
    description: "Literal English translation",
  },
  {
    code: "webbe",
    label: "World English Bible British Edition",
    language: "English UK",
    description: "British English edition",
  },
  {
    code: "oeb-cw",
    label: "Open English Bible Commonwealth",
    language: "English UK",
    description: "Commonwealth English edition",
  },
  {
    code: "oeb-us",
    label: "Open English Bible US",
    language: "English US",
    description: "US English edition",
  },
  {
    code: "cuv",
    label: "Chinese Union Version",
    language: "Chinese",
    description: "Chinese Bible translation",
  },
  {
    code: "almeida",
    label: "João Ferreira de Almeida",
    language: "Portuguese",
    description: "Portuguese Bible translation",
  },
  {
    code: "clementine",
    label: "Clementine Vulgate",
    language: "Latin",
    description: "Latin Vulgate translation",
  },
  {
    code: "rccv",
    label: "Romanian Corrected Cornilescu Version",
    language: "Romanian",
    description: "Romanian Bible translation",
  },
  {
    code: "bkr",
    label: "Bible kralická",
    language: "Czech",
    description: "Czech Bible translation",
  },
  {
    code: "cherokee",
    label: "Cherokee New Testament",
    language: "Cherokee",
    description: "Cherokee New Testament translation",
  },
];

export function getTranslationLabel(code: BibleTranslation): string {
  const translation = bibleTranslationOptions.find(
    (item) => item.code === code,
  );
  return translation?.label ?? "World English Bible";
}
