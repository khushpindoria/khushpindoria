export default function Footer() {
  return (
    <footer className="py-8 bg-gradient-to-r from-[--gradient-start] to-[--gradient-end]">
      <div className="container mx-auto px-4 text-center text-sm text-slate-300">
        <p>© {new Date().getFullYear()} Khush Pindoria. All rights reserved.</p>
      </div>
    </footer>
  );
}
