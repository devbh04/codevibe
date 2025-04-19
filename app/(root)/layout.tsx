import AppBar from "@/components/shared/appbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex flex-col">
      <AppBar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </main>
  );
}