const Button = ({ className, children, color, type, handleClick }) => (
  <button
    className={`uk-button uk-button-${color} uk-width-1-1 ${className}`}
    type={type}
    onClick={handleClick}
  >
    {children}
  </button>
);

export default Button;
