export type VocabularyIF = {
  [key in "id" | "$id"]?: string;
} & {
  english: string;
  indonesian: string;
};

export interface QuizIF extends VocabularyIF {
  isComplete?: boolean,
  options: string[]
}
