"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { ApiCredentialsForm } from "@/components/api-credentials-form";
import { OrderForms } from "@/components/order-forms";
import { OrderStatusTable } from "@/components/order-status-table";
import { ActivityLog } from "@/components/activity-log";
import type { Order, LogEntry } from "@/lib/types";

export default function Home() {
  const [apiKeysSet, setApiKeysSet] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      message: "Welcome! Please enter your API credentials to begin.",
      timestamp: new Date(),
      type: "INFO",
    },
  ]);

  const addLog = (message: string, type: LogEntry["type"]) => {
    setLogs((prev) => [
      { id: String(Date.now()), message, timestamp: new Date(), type },
      ...prev,
    ]);
  };

  const handleSetApiKeys = async (data: { key: string; secret: string }) => {
    addLog("Validating API credentials...", "INFO");
    // Simulate API validation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (data.key && data.secret) {
          setApiKeysSet(true);
          addLog("API credentials validated and saved successfully.", "SUCCESS");
        } else {
          setApiKeysSet(false);
          addLog("Invalid API credentials. Please check and try again.", "ERROR");
        }
        resolve();
      }, 1500);
    });
  };

  const handlePlaceOrder = (orderData: Omit<Order, "id" | "status" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: String(Date.now()),
      status: "PENDING",
      createdAt: new Date(),
    };
    addLog(`Submitting ${orderData.type} ${orderData.side} order for ${orderData.quantity} ${orderData.symbol}...`, "INFO");
    setOrders((prev) => [newOrder, ...prev]);

    // Simulate order execution
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      if (isSuccess) {
        setOrders((prev) =>
          prev.map((o) => (o.id === newOrder.id ? { ...o, status: "FILLED" } : o))
        );
        addLog(`${orderData.type} order ${newOrder.id} has been filled.`, "SUCCESS");
      } else {
        setOrders((prev) =>
          prev.map((o) => (o.id === newOrder.id ? { ...o, status: "FAILED" } : o))
        );
        addLog(`Failed to fill ${orderData.type} order ${newOrder.id}.`, "ERROR");
      }
    }, 2500);
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <ApiCredentialsForm onSubmit={handleSetApiKeys} isKeysSet={apiKeysSet} />
            <OrderForms onSubmit={handlePlaceOrder} disabled={!apiKeysSet} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <OrderStatusTable orders={orders} />
            <ActivityLog logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}
