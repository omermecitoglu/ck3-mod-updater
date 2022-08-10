export function getLocaleCode(language: string) {
  switch (language) {
  case "tr": return "tr-TR";
  default: return "en-US";
  }
}
