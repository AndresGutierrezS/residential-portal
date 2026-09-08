export interface Event {
  id: number;
  title: string;
  description: string;
  location: string | null;
  type: string;
  max_attendees: number | null;
  event_date: string;
  created_at: string;
  updated_at: string;
}