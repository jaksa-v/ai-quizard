import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // changed the background from "bg-primary/10"
      className={cn("animate-pulse rounded-md bg-muted-foreground", className)}
      {...props}
    />
  );
}

export { Skeleton };
