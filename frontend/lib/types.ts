export type SpeakerType = 'narrator' | 'male_character' | 'female_character';

export interface ChapterSummary {
  id: string;
  title: string;
  status: 'uploaded' | 'parsed' | 'ready' | 'generated';
  pages?: number;
}

export interface DialogueSegment {
  id: string;
  text: string;
  speaker: SpeakerType;
}

export interface AudioChapter {
  id: string;
  title: string;
  audioUrl?: string;
  duration?: number;
}
