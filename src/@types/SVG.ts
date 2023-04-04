import { CSSProperties, FC, SVGProps, SyntheticEvent } from 'react';

// ----------------------------------------------------------------------

export interface SVGIconWrapProps {
  fill?: string;
  fillOnHover?: string;
  stroke?: string;
  width: number;
  height: number;
  disabled?: boolean;
  isButton: boolean;
}

export interface SVGViewBoxProp {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

export interface SVGIconProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  fill?: string;
  stroke?: string;
  size?: number;
  boxSize?: {
    width: number;
    height: number;
  };
  viewBox?: SVGViewBoxProp;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (e: SyntheticEvent) => void;
}
