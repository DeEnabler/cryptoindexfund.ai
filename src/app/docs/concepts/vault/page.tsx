
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VaultConceptPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Vault Concepts</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Understanding how vaults work within CryptoIndexFund.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Vault Mechanics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This page will detail the vault concepts and mechanics. Vaults in CryptoIndexFund
            are smart contracts that hold and manage the underlying assets of a specific fund.
            We'll cover deposit/withdrawal processes, asset allocation, and how rebalancing
            is executed within the vault.
            Content coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
