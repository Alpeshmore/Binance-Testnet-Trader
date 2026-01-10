"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { KeyRound, ShieldCheck, ShieldX } from "lucide-react";

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
import { useState } from "react";

const formSchema = z.object({
  key: z.string().min(1, "API Key is required."),
  secret: z.string().min(1, "API Secret is required."),
});

type ApiCredentialsFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  isKeysSet: boolean;
};

export function ApiCredentialsForm({ onSubmit, isKeysSet }: ApiCredentialsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
      secret: "",
    },
  });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <KeyRound className="h-8 w-8 text-primary mt-1" />
          <div>
            <CardTitle>API Credentials</CardTitle>
            <CardDescription>Enter your Binance Testnet API keys.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Your API Key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Secret</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your API Secret" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Validating..." : "Save & Validate"}
              </Button>
              {isKeysSet ? (
                <div className="flex items-center gap-2 text-sm text-accent">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Validated</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldX className="h-4 w-4" />
                  <span>Not Validated</span>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
