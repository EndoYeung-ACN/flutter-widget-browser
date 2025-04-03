export default function Card({ children, className }) {
  return <div className={`rounded-xl shadow-sm ${className || ""}`}>{children}</div>;
}