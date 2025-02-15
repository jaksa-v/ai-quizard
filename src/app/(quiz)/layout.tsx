import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { NavigationLinks } from "./components/navigation-links";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <NavigationLinks />
        <div className="flex gap-x-2">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main className="max-w-screen-xl mx-auto px-4">{children}</main>
    </>
  );
}
