import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LogEntry } from "@/lib/types";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityLogProps = {
  logs: LogEntry[];
};

export function ActivityLog({ logs }: ActivityLogProps) {
  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "SUCCESS":
        return "text-accent";
      case "ERROR":
        return "text-destructive";
      case "INFO":
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="flex-grow flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Terminal className="h-8 w-8 text-primary mt-1" />
          <div>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>A stream of all application events.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex">
        <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-background/50">
          {logs.map((log) => (
            <div key={log.id} className="text-sm font-mono mb-2 last:mb-0">
              <span className="text-primary/70">{log.timestamp.toLocaleTimeString()} - </span>
              <span className={cn(getLogColor(log.type))}>{log.message}</span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
