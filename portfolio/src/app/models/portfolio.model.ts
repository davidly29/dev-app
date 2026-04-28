export interface Video {
  id: string;
  title: string;
  language: string;
  description: string;
  duration: string;
  thumbnail: string;
  tags: string[];
  year: number;
  url?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'concept';
  level: number; // 1–5
  icon: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'exercise' | 'quiz';
  completed?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: CourseLesson[];
  expanded?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration: string;
  sections: CourseSection[];
  color: string;
}
