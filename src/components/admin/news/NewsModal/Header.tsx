"use client";
import { LucideIcon } from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Header({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10">
          <Icon className="size-6" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col gap-1.5 pt-0.5">
          <DialogTitle className="text-[26px] leading-tight font-semibold tracking-tight text-foreground sm:text-[28px]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </DialogDescription>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-border via-border to-transparent" />
    </div>
  );
}
