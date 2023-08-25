import { iconName, IconSet } from '../../types/Icons';

interface IconProps {
  icon: iconName;
  size: number;
  height?: number;
  color?: string;
  onClick?: () => void;
}

const Icon = ({
  icon,
  size,
  height = size,
  color = 'none',
  onClick,
}: IconProps) => {
  const { path, viewBox, ...rest } = IconSet[icon];

  return (
    <svg
      height={height}
      width={size}
      viewBox={viewBox}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d={path} {...rest} />
    </svg>
  );
};

export default Icon;
