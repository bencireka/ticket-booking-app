export interface TheatrePlay {
  id: string;
  title: string;
  date: number;
  theatreId: string;
  imageId?: string;
  availableTickets: string[];
}
