
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, BookOpen, Users, Settings, FileText, Lightbulb, Landmark, ShieldCheck, Info, BarChart3, FolderGit2, HelpCircleIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation - CryptoIndexFund',
  description: 'Official documentation for CryptoIndexFund.',
};

const docsNavItems = [
  {
    label: 'Overview',
    items: [
      { name: 'Introduction', href: '/docs', icon: Home },
      { name: 'What is CryptoIndexFund?', href: '/docs/what-is', icon: Info },
    ],
  },
  {
    label: 'Concepts',
    items: [
      { name: 'Market', href: '/docs/concepts/market', icon: BarChart3 },
      { name: 'Vault', href: '/docs/concepts/vault', icon: Landmark },
      { name: 'Oracle', href: '/docs/concepts/oracle', icon: Lightbulb },
    ],
  },
  {
    label: 'Developers',
    items: [
      { name: 'Quick Start', href: '/docs/developers/quick-start', icon: Settings },
      { name: 'API Reference', href: '/docs/developers/api', icon: FileText },
    ],
  },
  {
    label: 'Governance',
    items: [
        { name: 'Organization', href: '/docs/governance/organization', icon: Users },
        { name: 'Tokenomics', href: '/docs/governance/tokenomics', icon: FolderGit2 },
    ],
  },
  {
    label: 'Resources',
    items: [
      { name: 'Security', href: '/docs/resources/security', icon: ShieldCheck },
      { name: 'FAQ', href: '/docs/resources/faq', icon: HelpCircleIcon },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="icon"
          className="border-r border-sidebar-border fixed md:sticky top-0 h-screen z-40"
        >
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2 group/logo">
              <Image
                src="/android-chrome-192x192.png"
                alt="CryptoIndexFund Logo"
                data-ai-hint="logo abstract"
                width={32}
                height={32}
                className="transition-transform duration-300 ease-in-out group-hover/logo:scale-110"
              />
              <h1 className="text-xl font-semibold text-sidebar-primary group-data-[collapsible=icon]:hidden transition-opacity duration-200">
                CryptoIndexFund
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {docsNavItems.map((group) => (
                <SidebarGroup key={group.label}>
                  <SidebarGroupLabel className="text-sidebar-foreground/70 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2">
                    <span className="group-data-[collapsible=icon]:hidden">{group.label}</span>
                    {/* Optionally show first letter or an icon when collapsed */}
                    {/* <span className="hidden group-data-[collapsible=icon]:inline">{group.label.charAt(0)}</span> */}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          href={item.href}
                          asChild
                          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                          tooltip={{
                            children: item.name,
                            className: "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border",
                           }}
                        >
                          <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.name}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarMenu>
          </SidebarContent>
          {/* Optional Sidebar Footer can go here 
          <SidebarFooter className="p-2 border-t border-sidebar-border group-data-[collapsible=icon]:hidden">
             Footer content 
          </SidebarFooter>
          */}
        </Sidebar>
        <SidebarInset className="flex-1 bg-background relative">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
            <SidebarTrigger className="md:hidden" /> 
            <Link href="/" className="flex items-center gap-2 md:hidden">
                <Image src="/android-chrome-192x192.png" alt="CryptoIndexFund Logo" data-ai-hint="logo abstract" width={24} height={24} />
                <span className="font-semibold">CryptoIndexFund Docs</span>
            </Link>
          </header>
          <main className="p-4 sm:px-6 sm:py-0 md:p-6 lg:p-8 flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
