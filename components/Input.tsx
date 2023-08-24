/**
 * Props for the Input component.
 */
interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

/**
 * Component for rendering an input field.
 *
 * @component
 * @param {InputProps} props - Props for configuring the input field.
 */
const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  onChange,
  disabled,
  label,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className="
            w-full
            p-4 
            text-lg 
            bg-black 
            border-2
            border-neutral-800 
            rounded-md
            outline-none
            text-white
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
    />
  );
};

export default Input;
