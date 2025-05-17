
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Loader2 className="h-16 w-16 text-primary animate-spin" />
      <p className="mt-4 text-lg text-muted-foreground">Loading CryptoIndexFund...</p>
    </div>
  );
}
