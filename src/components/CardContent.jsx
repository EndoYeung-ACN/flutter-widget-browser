export default function CardContent({ children, className = "" }) {
  return <div className={`p-4 md:p-6 ${className}`}>{children}</div>;
}
