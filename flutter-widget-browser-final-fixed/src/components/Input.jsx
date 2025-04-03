export default function Input({ className = '', ...props }) {
  return <input className={`w-full border px-3 py-2 rounded text-sm ${className}`} {...props} />;
}