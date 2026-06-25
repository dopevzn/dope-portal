import { Badge } from "@/components/ui/badge";
import { getStatusTone, type StatusTone } from "@/lib/recruitlook-seed";

type StatusBadgeProps = {
  status: string;
  tone?: StatusTone;
};

const badgeVariantByTone = {
  cyan: "cyan",
  destructive: "destructive",
  neutral: "secondary",
  primary: "default",
  success: "success",
  warning: "warning",
} as const;

export function StatusBadge({ status, tone }: StatusBadgeProps) {
  const resolvedTone = tone ?? getStatusTone(status);

  return <Badge variant={badgeVariantByTone[resolvedTone]}>{status}</Badge>;
}
