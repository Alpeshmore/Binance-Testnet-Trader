"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Order, OrderType } from "@/lib/types";
import { Forward } from "lucide-react";

type OrderFormsProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "createdAt">) => void;
  disabled: boolean;
};

const marketSchema = z.object({
  symbol: z.string().min(3, "Symbol is required.").toUpperCase(),
  quantity: z.coerce.number().positive("Quantity must be positive."),
  side: z.enum(["BUY", "SELL"]),
});

const limitSchema = marketSchema.extend({
  price: z.coerce.number().positive("Price must be positive."),
});

const stopLimitSchema = limitSchema.extend({
    stopPrice: z.coerce.number().positive("Stop price must be positive."),
});

export function OrderForms({ onSubmit, disabled }: OrderFormsProps) {
  const commonSubmitHandler = (type: OrderType) => (values: any) => {
    onSubmit({ ...values, type });
  };

  return (
    <Card className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      <CardHeader>
        <div className="flex items-start gap-4">
            <Forward className="h-8 w-8 text-primary mt-1" />
            <div>
                <CardTitle>Place Order</CardTitle>
                <CardDescription>Create a new order on the testnet.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="market">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
            <TabsTrigger value="stop-limit">Stop-Limit</TabsTrigger>
          </TabsList>
          <TabsContent value="market">
            <OrderFormBase schema={marketSchema} onSubmit={commonSubmitHandler("MARKET")} type="MARKET" />
          </TabsContent>
          <TabsContent value="limit">
            <OrderFormBase schema={limitSchema} onSubmit={commonSubmitHandler("LIMIT")} type="LIMIT" />
          </TabsContent>
          <TabsContent value="stop-limit">
            <OrderFormBase schema={stopLimitSchema} onSubmit={commonSubmitHandler("STOP_LIMIT")} type="STOP_LIMIT" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function OrderFormBase({ schema, onSubmit, type }: { schema: z.ZodObject<any>; onSubmit: (values: any) => void; type: OrderType }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      symbol: "BTCUSDT",
      quantity: "",
      side: "BUY",
      price: "",
      stopPrice: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder="e.g., BTCUSDT" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" step="any" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        { (type === 'LIMIT' || type === 'STOP_LIMIT') &&
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input type="number" step="any" placeholder="Order price" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        }
        { type === 'STOP_LIMIT' &&
            <FormField
            control={form.control}
            name="stopPrice"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Stop Price</FormLabel>
                <FormControl>
                    <Input type="number" step="any" placeholder="Stop trigger price" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        }
        <FormField
          control={form.control}
          name="side"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Side</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BUY" id="buy" />
                    </FormControl>
                    <FormLabel htmlFor="buy" className="font-medium text-accent">Buy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="SELL" id="sell" />
                    </FormControl>
                    <FormLabel htmlFor="sell" className="font-medium text-destructive">Sell</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Place {type.replace('_', ' ')} Order
        </Button>
      </form>
    </Form>
  );
}
