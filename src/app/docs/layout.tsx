
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - CryptoIndexFund',
  description: 'Official documentation for CryptoIndexFund.',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
