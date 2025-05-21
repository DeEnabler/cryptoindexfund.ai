
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiReferencePage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">API Reference</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Detailed documentation for the CryptoIndexFund API endpoints.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Available Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This section will provide comprehensive details on all public API endpoints,
            including request parameters, responses, authentication methods, and rate limits.
            You'll find examples for fetching fund data, historical performance, and more.
            Content coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
