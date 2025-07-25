import { useState } from "react";

export function useDialog() {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen((prev) => !prev);

  return { open, onOpen, onClose, onToggle };
}
