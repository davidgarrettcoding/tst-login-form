import styles from './Input.module.css';

interface InputProps {
  error?: string;
  field: 'username' | 'password' | 'confirmPassword';
  label: string;
  onChange: (value: string) => void;
  successMessage?: string;
  type: string;
  value: string;
}

const Input: React.FC<InputProps> = ({
  error,
  field,
  label,
  onChange,
  successMessage,
  type,
  value,
}) => (
  <label htmlFor={field}>
    {label}
    <input
      id={field}
      name={field}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      value={value}
    />
    {error && <span className={styles.error}>{error}</span>}
    {successMessage && <span className={styles.success}>{successMessage}</span>}
  </label>
);

export default Input;
