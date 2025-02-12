import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Link } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <Button variant="link">Home</Button>
        </Link>
        <div className="flex gap-x-2">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      {children}
    </>
  );
}
