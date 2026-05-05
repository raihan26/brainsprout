import { useParams } from 'react-router-dom';
import type { GradeId } from '../types';
import { isValidGrade } from '../data/grades';

export function useGrade(): GradeId {
  const { grade } = useParams<{ grade: string }>();
  return isValidGrade(grade ?? '') ? grade as GradeId : 'k';
}
