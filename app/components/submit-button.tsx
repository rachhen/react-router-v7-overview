import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "./ui/button";

export function SubmitButton(props: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}
