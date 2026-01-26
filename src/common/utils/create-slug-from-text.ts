import { GenerateRandomSuffix } from './generate-randoms-suffix';
import { slugify } from './slugify';

export function createSlugFromText(text: string): string {
  const slug = slugify(text);
  return `${slug}-${GenerateRandomSuffix()}`;
}
