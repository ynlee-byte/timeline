/**
 * Check if the current day is Monday, Tuesday, or Wednesday
 * Used to determine if review writing is allowed
 */
export function canWriteReview(): boolean {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Return true for Monday (1), Tuesday (2), and Wednesday (3)
  return dayOfWeek >= 1 && dayOfWeek <= 3;
}

/**
 * Check if the current day allows goal writing
 * Can be customized based on your business logic
 */
export function canWriteGoal(): boolean {
  // Allow goal writing on all days for now
  return true;
}

/**
 * Check if the current day allows judgment writing
 * Can be customized based on your business logic
 */
export function canWriteJudgment(): boolean {
  // Allow judgment writing on all days for now
  return true;
}

/**
 * Get the current day of week (0-6, Sunday = 0)
 */
export function getCurrentDayOfWeek(): number {
  const today = new Date();
  return today.getDay();
}

/**
 * Get the name of a day from its number (0-6)
 */
export function getDayName(dayNumber: number): string {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return days[dayNumber] || '';
}

/**
 * Get the start of the current week (Sunday)
 */
export function getStartOfWeek(date: Date = new Date()): Date {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

/**
 * Get the end of the current week (Saturday)
 */
export function getEndOfWeek(date: Date = new Date()): Date {
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

/**
 * Format a date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}