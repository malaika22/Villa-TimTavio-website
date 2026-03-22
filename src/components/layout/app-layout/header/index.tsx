import Image from "next/image";
import { NAV_LINKS } from "./constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <nav className="backdrop-blur-[20px] bg-[#F5F3F0F5] px-[100px] h-[80px] flex items-center justify-between">
      <div className="w-[175px] h-[40px] relative">
        <Image src="/images/logo-dark.png" alt="Casa Tim Tavio Logo" layout="fill" />
      </div>
      <div className="space-x-[52px]">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="text-[#18181873] text-xs">
            {link.label}
          </Link>
        ))}
      </div>
      <Button
        className="text-xs min-h-[31px] h-auto border border-[#18181840] rounded-none bg-transparent text-[#1818188C] px-[28px] py-[13px]"
        asChild
      >
        <Link href="#">REQUEST AN INVITATION</Link>
      </Button>
    </nav>
  );
};
