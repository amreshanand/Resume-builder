export default function Loader({ text = 'Loading...', size = 'md' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className={`${sizes[size]} rounded-full border-[var(--surface-lighter)] border-t-[var(--primary)] animate-spin`}
      />
      <p className="text-sm text-[var(--text-muted)]">{text}</p>
    </div>
  );
}
