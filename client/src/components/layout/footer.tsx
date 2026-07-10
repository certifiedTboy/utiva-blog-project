export default function Footer() {
  return (
    <footer className="border-t mt-12 border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-serif font-semibold text-foreground">
            Ade's Notes
          </span>
          <span>· A place where I share my thoughtful ideas...</span>
        </div>

        <p>© {new Date().getFullYear()} Ade's Notes</p>
      </div>
    </footer>
  );
}
