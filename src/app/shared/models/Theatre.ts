export interface Theatre {
  id: string;
  maxCapacity: number;
  seats: { id: string, sector: string, row: number, seatNum: number, price: number}[];
}
