import { Badge } from "@/components/ui/badge";

export interface StatusBadgeProps {
  status: "active" | "paused";
}

export function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const variant = status === "active" ? "default" : "secondary";
  const text = status === "active" ? "✅ Активен" : "⏸ На паузе";
  return (
    <Badge variant={variant} {...props}>
      {text}
    </Badge>
  );
}
