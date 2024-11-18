export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  description: string;
  announcements: Announcement[];
  assignments: Assignment[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: "pending" | "submitted" | "graded";
}

export interface Grade {
  courseId: string;
  courseName: string;
  assignments: {
    id: string;
    title: string;
    grade: number;
    maxPoints: number;
  }[];
}
