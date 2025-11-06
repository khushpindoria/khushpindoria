import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-red-500">
        <Image
          src="/img/kp-initials.png"
          alt="Logo"
          width={32}
          height={32}
          priority
          className="h-8 w-8"
        />
      </div>
      <span className="text-xl font-bold tracking-tighter text-primary" style={{ fontFamily: 'Archivo, sans-serif' }}>
        KP
      </span>
    </Link>
  );
}