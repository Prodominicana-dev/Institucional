"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepDef {
  label: string;
  icon: React.ReactNode;
}

export function Stepper({
  steps,
  activeStep,
}: {
  steps: StepDef[];
  activeStep: number;
}) {
  return (
    <div className="flex w-full items-start" role="list" aria-label="Progreso del formulario">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isCurrent = index === activeStep;

        return (
          <React.Fragment key={step.label}>
            <div
              role="listitem"
              aria-current={isCurrent ? "step" : undefined}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                initial={false}
                animate={{ scale: isCurrent ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-primary/5 text-primary ring-4 ring-primary/10",
                  !isCompleted &&
                    !isCurrent &&
                    "border-border bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="flex items-center justify-center"
                  >
                    <Check className="size-4" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  step.icon
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="relative mx-2 mt-5 h-[2px] flex-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  initial={false}
                  animate={{ width: index < activeStep ? "100%" : "0%" }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
