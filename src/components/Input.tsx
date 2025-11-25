interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
}

function Input({ type = "", placeholder = "", className = "" }: InputProps) {
  const hasCustomWidth = className.includes("w-");
  const defaultWidth = hasCustomWidth ? "" : "w-[60vw] md:w-[30vw]";
  return <input type={type} placeholder={placeholder} className={`shadow-lg border border-black/10 rounded-sm p-2 mb-3 ${defaultWidth} h-[6vh] ${className}`} />;
}

export default Input;