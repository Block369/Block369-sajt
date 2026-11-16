export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: React.ReactNode;
}) {
  return (
    <header className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight break-words sm:text-4xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">{intro}</p>
      )}
    </header>
  );
}
