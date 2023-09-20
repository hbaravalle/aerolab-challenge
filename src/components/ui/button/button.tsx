import { FC, ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'text-white p-4 rounded-lg font-medium',
  variants: {
    colorScheme: {
      primary: 'bg-blue-400',
      secondary: 'bg-red-400',
    },
  },
});

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>;

const Button: FC<ButtonProps> = ({ className, colorScheme, ...props }) => {
  return <button {...props} className={button({ className, colorScheme })} />;
};

export default Button;
