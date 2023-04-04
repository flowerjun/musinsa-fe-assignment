import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { SVGIconProps, SVGIconWrapProps, SVGViewBoxProp } from 'src/@types/SVG';

import { ReactComponent as deleteIcon } from './delete-icon.svg';
import { ReactComponent as loadingIcon } from './loading-icon.svg';
import { ReactComponent as logo } from './logo.svg';
import { ReactComponent as notFoundIcon } from './not-found-icon.svg';
import { ReactComponent as refreshIcon } from './refresh-icon.svg';
import { ReactComponent as searchIcon } from './search-icon.svg';

// ----------------------------------------------------------------------

export const iconImagePath = {
  logo,
  deleteIcon,
  loadingIcon,
  notFoundIcon,
  refreshIcon,
  searchIcon,
};

const SVGIconWrap = styled.div<SVGIconWrapProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  ${(props) =>
    props.isButton &&
    css`
      cursor: pointer;
    `};

  svg > path {
    ${(props) =>
      props.fill &&
      css`
        fill: ${props.fill};
      `}
  }

  svg > circle {
    ${(props) =>
      props.fill &&
      css`
        fill: ${props.fill};
      `}
  }

  ${(props) =>
    props.disabled &&
    css`
      svg {
        :hover {
          cursor: not-allowed;
        }
      }
    `};
`;

export const SVGIcon = ({
  icon: SvgIcon,
  viewBox: _viewBox,
  fill,
  stroke,
  size,
  boxSize = { height: 22, width: 22 },
  disabled,
  style,
  onClick,
}: SVGIconProps) => {
  const viewBox: SVGViewBoxProp = useMemo(() => {
    if (_viewBox) return _viewBox;
    return { minX: 0, minY: 0, width: 24, height: 24 };
  }, [SvgIcon]);

  const height = size || boxSize?.height;
  const width = size || boxSize?.width;

  return (
    <SVGIconWrap
      fill={fill}
      height={height}
      width={width}
      disabled={disabled}
      style={style}
      onClick={(event) => onClick && onClick(event)}
      isButton={!!onClick}
    >
      <SvgIcon
        stroke={stroke}
        width={width}
        height={height}
        viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
      />
    </SVGIconWrap>
  );
};
