export default function Button({ children, variant = 'default', size = 'md', ...props }) {
  const base = "inline-flex items-center justify-center rounded text-sm font-medium transition-colors";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-800",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800",
  };
  const sizes = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    icon: "h-8 w-8 p-0",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </button>
  );
}