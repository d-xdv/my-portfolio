export const certifications = [
  { id: 1, title: 'Introduction to Artificial Intelligence', issuer: 'KAUST Academy', year: '2026', month: 'Jan', gradient: 'from-blue-500 to-cyan-500' },
  { id: 2, title: 'Advanced Artificial Intelligence and Machine Learning', issuer: 'KAUST Academy', year: '2025', month: 'Jun', gradient: 'from-cyan-500 to-blue-600' },
  { id: 3, title: 'AWS Academy Graduate — Cloud Foundations', issuer: 'Amazon Web Services (AWS)', year: '2026', month: 'Apr', gradient: 'from-orange-500 to-yellow-500' },
  { id: 4, title: 'Mathematics for Machine Learning and Data Science', issuer: 'DeepLearning.AI / Coursera', year: '2025', month: 'Nov', gradient: 'from-blue-600 to-sky-500' },
  { id: 5, title: 'Probability & Statistics for ML & Data Science', issuer: 'DeepLearning.AI / Coursera', year: '2025', month: 'Dec', gradient: 'from-teal-500 to-green-500' },
  { id: 6, title: 'Calculus for Machine Learning and Data Science', issuer: 'DeepLearning.AI / Coursera', year: '2025', month: 'Dec', gradient: 'from-red-500 to-orange-500' },
  { id: 7, title: 'Linear Algebra for Machine Learning and Data Science', issuer: 'DeepLearning.AI / Coursera', year: '2025', month: 'Dec', gradient: 'from-cyan-500 to-blue-500' },
  { id: 8, title: 'HCIA-AI — Huawei Certified ICT Associate', issuer: 'Huawei', year: '2025', month: 'Apr', gradient: 'from-red-600 to-rose-500' },
  { id: 9, title: 'Cybersecurity Fundamentals', issuer: 'IBM', year: '2024', month: 'Jul', gradient: 'from-blue-600 to-sky-600' },
  { id: 10, title: 'Artificial Intelligence Fundamentals', issuer: 'IBM', year: '2024', month: 'Jul', gradient: 'from-blue-500 to-sky-500' },
  { id: 11, title: 'Data Analysis', issuer: 'Misk Career Essentials', year: '2026', month: 'Feb', gradient: 'from-green-500 to-emerald-600' },
  { id: 12, title: 'Python Basics', issuer: 'King Khalid University', year: '2025', month: 'Jan', gradient: 'from-yellow-500 to-amber-500' },
  { id: 13, title: 'English for Computer Sciences & IT', issuer: 'King Khalid University', year: '2024', month: 'May', gradient: 'from-slate-500 to-gray-600' },
  { id: 14, title: 'eJPT Bootcamp', issuer: 'King Abdulaziz University', year: '2026', month: 'Apr', gradient: 'from-red-500 to-pink-500' },
  { id: 15, title: 'Unleashing the Power of AI Agents', issuer: 'IBM', year: '2026', month: 'May', gradient: 'from-sky-500 to-blue-600' },
  { id: 16, title: 'AI Accelerator', issuer: 'IE Club at King Saud University', year: '2026', month: 'Apr–May', gradient: 'from-orange-400 to-red-500' },
  { id: 17, title: 'Data Science & Analytics Workshop', issuer: 'IEEE Student Branch, IMSIU', year: '2026', month: 'Apr', gradient: 'from-teal-400 to-cyan-600' },
  { id: 18, title: '360 Drone Club Bootcamp', issuer: 'Drone Club, University of Jeddah', year: '2026', month: 'May', gradient: 'from-sky-400 to-blue-600' },
  { id: 19, title: 'Power BI Data Analysis Bootcamp', issuer: 'IEOM Chapter, King Khalid University', year: '2026', month: 'May', gradient: 'from-amber-400 to-orange-600' },
];

export type Certification = (typeof certifications)[number];
