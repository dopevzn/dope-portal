import { Badge } from "@/components/ui/badge";
import type { ModuleColumn, ModuleRow } from "@/lib/recruitlook-seed";
import { cn } from "@/lib/utils";

import { StatusBadge } from "./status-badge";

type DataTableProps = {
  columns: ModuleColumn[];
  rows: ModuleRow[];
  minWidth?: number;
  surface?: "embedded" | "framed";
};

function badgeVariantForValue(value: string) {
  const normalized = value.toLowerCase();

  if (["high", "needs approval", "needs review"].includes(normalized)) {
    return "destructive";
  }

  if (["medium", "pending", "queued", "processing"].includes(normalized)) {
    return "warning";
  }

  if (["photo", "video", "edit", "client library"].includes(normalized)) {
    return "cyan";
  }

  return "secondary";
}

export function DataTable({
  columns,
  rows,
  minWidth = 760,
  surface = "framed",
}: DataTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden",
        surface === "framed" && "rounded-[8px] border border-border bg-card",
      )}
    >
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-left"
          style={{ minWidth }}
        >
          <thead>
            <tr className="border-b border-border bg-background/70">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-xs font-bold uppercase text-muted-foreground",
                    column.align === "right" && "text-right",
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-secondary/55">
                {columns.map((column) => {
                  const rawValue = row.values[column.key];
                  const value = String(rawValue);

                  return (
                    <td
                      key={column.key}
                      className={cn(
                        "px-4 py-3 text-sm text-foreground",
                        column.align === "right" && "text-right",
                        column.type === "mono" && "font-mono text-xs",
                      )}
                    >
                      {column.type === "status" ? (
                        <StatusBadge status={value} />
                      ) : column.type === "badge" ? (
                        <Badge variant={badgeVariantForValue(value)}>{value}</Badge>
                      ) : (
                        <span
                          className={cn(
                            column.type === "number" && "font-semibold",
                            column.type === "date" && "text-muted-foreground",
                          )}
                        >
                          {value}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
