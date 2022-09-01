import { IButton } from './Button.model';

const Button = ({ onClick, children }: IButton) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
