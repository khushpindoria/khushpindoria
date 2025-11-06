import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className="text-3xl font-normal tracking-wider text-primary font-logo">
        KP
      </span>
    </Link>
  );
}