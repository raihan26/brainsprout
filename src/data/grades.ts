import type { GradeId, GradeMeta } from '../types';

export const GRADES: GradeMeta[] = [
  {
    id: 'k',
    label: 'K',
    title: 'Kindergarten',
    emoji: '🌈',
    color: 'sun',
    bgGradient: 'from-yellow-200 via-orange-100 to-pink-100',
    description: 'Colors, shapes, counting & first letters!',
  },
  {
    id: '1',
    label: '1',
    title: 'Grade 1',
    emoji: '🚀',
    color: 'sky',
    bgGradient: 'from-sky-200 via-blue-100 to-indigo-100',
    description: 'Addition, subtraction & reading words!',
  },
  {
    id: '2',
    label: '2',
    title: 'Grade 2',
    emoji: '⚡',
    color: 'grass',
    bgGradient: 'from-emerald-200 via-green-100 to-teal-100',
    description: 'Multiplication, stories & science!',
  },
  {
    id: '3',
    label: '3',
    title: 'Grade 3',
    emoji: '🏆',
    color: 'plum',
    bgGradient: 'from-purple-200 via-fuchsia-100 to-pink-100',
    description: 'Division, paragraphs & experiments!',
  },
];

export const gradeById = (id: GradeId): GradeMeta =>
  GRADES.find((g) => g.id === id)!;

export const isValidGrade = (id: string): id is GradeId =>
  ['k', '1', '2', '3'].includes(id);
