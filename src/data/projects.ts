export const projects = [
  {
    slug: 'age-prediction-face-images',
    title: 'Age Prediction from Face Images',
    emoji: '🧑‍💻',
    gradient: 'from-blue-600 to-cyan-700',
    description:
      'CNN-based regression model using PyTorch trained on 2,000 human face images to predict age. Implemented full ML pipeline: data preprocessing, model training, and evaluation with accurate results.',
    highlights: [
      'Trained on 2,000 face image dataset',
      'CNN-based regression architecture',
      'Full ML pipeline: preprocess → train → evaluate',
    ],
    tags: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision', 'CNN'],
    github: '',
    demo: '',
  },
  {
    slug: 'student-grading-oop',
    title: 'Student Grading System — OOP Design',
    emoji: '🎓',
    gradient: 'from-teal-500 to-blue-700',
    description:
      'Multi-class grading system built with full OOP principles. Features Student, UndergradStudent, GradStudent, and RegistrationSystem classes with distinct grading logic and add/modify functionality.',
    highlights: [
      'Full OOP: Encapsulation, Inheritance, Abstraction, Polymorphism',
      'Multiple student types with distinct requirements',
      'Add/modify student functionality',
    ],
    tags: ['Java', 'OOP', 'Encapsulation', 'Inheritance', 'Polymorphism'],
    github: '',
    demo: '',
  },
  {
    slug: 'student-grading-file-io',
    title: 'Student Grading System — File I/O & Collections',
    emoji: '📂',
    gradient: 'from-green-500 to-teal-600',
    description:
      'Extended grading system supporting multiple courses per student via arrays and collections. Implements file persistence to automatically save and load all student data on startup.',
    highlights: [
      'File persistence: auto-save and auto-load on startup',
      'Multi-course support per student',
      'Arrays and Collections-based architecture',
    ],
    tags: ['Java', 'Arrays', 'Collections', 'File I/O', 'Data Persistence'],
    github: '',
    demo: '',
  },
];

export type Project = (typeof projects)[number];
