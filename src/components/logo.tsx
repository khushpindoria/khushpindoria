import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/img/kp-intials.png"
        alt="Logo"
        width={32}
        height={32}
        priority
        className="h-8 w-8"
      />
      <span className="text-xl font-bold tracking-tighter text-primary">
        KP
      </span>
    </Link>
  );
}