// Re-mounts on every navigation, so this CSS-only fade doubles as the page transition (no JS cost).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
