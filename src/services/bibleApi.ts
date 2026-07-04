import { BibleVerse } from "../types/bible";

type BibleApiResponse = {
  reference: string;
  text: string;
  translation_name?: string;
};

export async function getVerseByReference(
  reference: string,
): Promise<BibleVerse | null> {
  try {
    const encodedReference = encodeURIComponent(reference);
    const response = await fetch(`https://bible-api.com/${encodedReference}`);

    if (!response.ok) {
      return null;
    }

    const data: BibleApiResponse = await response.json();

    return {
      id: data.reference.toLowerCase().replace(/\s+/g, "-"),
      reference: data.reference,
      text: data.text.trim(),
      translationName: data.translation_name,
    };
  } catch (error) {
    console.log("Failed to fetch bible verse:", error);
    return null;
  }
}

export function getDailyVerseReference(): string {
  const references = [
    "John 3:16",
    "Psalm 23:1",
    "Romans 8:28",
    "Philippians 4:13",
    "Matthew 6:33",
    "Proverbs 3:5",
    "Jeremiah 29:11",
  ];

  const today = new Date();
  const index = today.getDate() % references.length;

  return references[index];
}
