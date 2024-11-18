export const mockCourses = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. Smith",
    description: "An introductory course to computer science principles.",
    announcements: [
      {
        id: "1",
        title: "Welcome to CS101",
        content: "Welcome to the course! Please review the syllabus.",
        date: "2024-03-20",
      },
    ],
    assignments: [
      {
        id: "1",
        title: "Programming Assignment 1",
        dueDate: "2024-04-01",
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    title: "Data Structures",
    code: "CS201",
    instructor: "Dr. Johnson",
    description: "Advanced data structures and algorithms.",
    announcements: [],
    assignments: [],
  },
];

export const mockAssignments = [
  {
    id: "1",
    courseId: "1",
    title: "Programming Assignment 1",
    description: "Implement a basic calculator using Python",
    dueDate: "2024-04-01",
    points: 100,
    status: "pending",
  },
  {
    id: "2",
    courseId: "1",
    title: "Programming Assignment 2",
    description: "Create a linked list implementation",
    dueDate: "2024-04-15",
    points: 100,
    status: "pending",
  },
];

export const mockGrades = [
  {
    courseId: "1",
    courseName: "Introduction to Computer Science",
    assignments: [
      {
        id: "1",
        title: "Programming Assignment 1",
        grade: 95,
        maxPoints: 100,
      },
    ],
  },
];
