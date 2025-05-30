import Image from "next/image";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <div className="auth-asset">
        <div>
          <Image src="/icons/auth-image.png" alt="auth-image" width={500} height={500} className="object-contain"/>
        </div>
      </div>
      {children}
    </main>
  );
}
