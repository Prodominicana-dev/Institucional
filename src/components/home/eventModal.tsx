import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function EventModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="bg-transparent border-none shadow-none">
          <DialogClose className="fill-white" />
          <DialogTitle className="text-center text-2xl font-bold text-white"></DialogTitle>
          <Link
            href={
              "https://surveys.intracen.org/response/G2tIYnddTgoDYVFzX1R6S0d1enk"
            }
            target="_blank"
          >
            <Image
              src={"/images/weideNewModal.jpg"}
              alt="Weide Modal"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}
