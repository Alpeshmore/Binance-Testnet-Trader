export type OrderSide = "BUY" | "SELL";
export type OrderType = "MARKET" | "LIMIT" | "STOP_LIMIT";
export type OrderStatus = "PENDING" | "FILLED" | "FAILED" | "CANCELED";

export interface Order {
  id: string;
  symbol: string;
  type: OrderType;
  side: OrderSide;
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface LogEntry {
  id: string;
  message: string;
  timestamp: Date;
  type: "INFO" | "SUCCESS" | "ERROR";
}
