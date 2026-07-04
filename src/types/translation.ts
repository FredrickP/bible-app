export type BibleTranslation =
  | "cherokee"
  | "cuv"
  | "bkr"
  | "asv"
  | "bbe"
  | "darby"
  | "dra"
  | "kjv"
  | "web"
  | "ylt"
  | "oeb-cw"
  | "webbe"
  | "oeb-us"
  | "clementine"
  | "almeida"
  | "rccv";

export type BibleTranslationOption = {
  code: BibleTranslation;
  label: string;
  language: string;
  description: string;
};
