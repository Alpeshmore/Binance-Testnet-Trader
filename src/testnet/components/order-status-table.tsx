import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, badgeVariants } from "@/components/ui/badge";
import type { Order, OrderStatus } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

type OrderStatusTableProps = {
  orders: Order[];
};

export function OrderStatusTable({ orders }: OrderStatusTableProps) {
  const getStatusBadgeVariant = (status: OrderStatus): VariantProps<typeof badgeVariants>["variant"] => {
    switch (status) {
      case "FILLED":
        return "accent";
      case "PENDING":
        return "secondary";
      case "FAILED":
        return "destructive";
      case "CANCELED":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="flex-grow flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
          <ListChecks className="h-8 w-8 text-primary mt-1" />
          <div>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Live updates on your recent orders.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex">
        <ScrollArea className="h-72 w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Side</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground h-24">
                    No orders placed yet.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.symbol}</TableCell>
                    <TableCell>{order.type.replace("_", " ")}</TableCell>
                    <TableCell className={cn(order.side === "BUY" ? "text-accent" : "text-destructive")}>
                      {order.side}
                    </TableCell>
                    <TableCell className="text-right">{order.quantity}</TableCell>
                    <TableCell className="text-right">{order.price ? `$${order.price.toFixed(2)}` : "N/A"}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.createdAt.toLocaleTimeString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
