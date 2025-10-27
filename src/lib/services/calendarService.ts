import { supabase } from "../supabase/client";

/**
 * Confirm calendar events for the current week
 */
export async function confirmCalendar(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to confirm calendar");
  }

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0);

  const { error } = await supabase
    .from("calendar_confirmations")
    .insert({
      user_id: user.id,
      confirmed_at: new Date().toISOString(),
      week_start: startOfWeek.toISOString(),
    });

  if (error) {
    throw error;
  }
}

/**
 * Check if user has confirmed calendar this week
 */
export async function hasConfirmedCalendarThisWeek(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("calendar_confirmations")
    .select("*")
    .eq("user_id", user.id)
    .gte("week_start", startOfWeek.toISOString())
    .limit(1);

  if (error) {
    console.error("Error checking calendar confirmation:", error);
    return false;
  }

  return data && data.length > 0;
}