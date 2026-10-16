export function Card({ children, className = '', titulo, acoes }) {
  return (
    <section className={`bg-card border border-line rounded-2xl shadow-card ${className}`}>
      {(titulo || acoes) && (
        <header className="flex items-center justify-between px-6 py-4 border-b border-line">
          {titulo && <h2 className="text-ink font-semibold text-base">{titulo}</h2>}
          {acoes && <div className="flex items-center gap-2">{acoes}</div>}
        </header>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}