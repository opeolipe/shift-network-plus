export type QuestionType = 'port' | 'subnet' | 'binary' | 'architect' | 'acronym' | 'cli' | 'multi-select' | 'visual' | 'cli-interactive' | 'syslog';

export interface Question {
  id: string;
  type: QuestionType;
  domain: string;
  objective: string;
  question: string;
  options: string[];
  correctAnswer: string | string[];
  explanation: string | {
    whyCorrect: string;
    whyWrong: { option: string; reason: string }[];
  };
  weight: number;
  imageUrl?: string;
  logData?: string[];
  correctLogIndex?: number;
}
