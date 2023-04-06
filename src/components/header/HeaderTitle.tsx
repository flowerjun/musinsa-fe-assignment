import styled from 'styled-components';

import { color } from 'src/theme/theme';
import { iconImagePath, SVGIcon } from 'src/assets/assets-path';

// ----------------------------------------------------------------------

const HeaderTitle = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  width: 375px;
  height: 50px;
  background-color: ${color.white};
  z-index: 100;
`;

export default function Header() {
  return (
    <HeaderTitle>
      <SVGIcon
        icon={iconImagePath.logo}
        boxSize={{ width: 94.89, height: 16 }}
        viewBox={{ minX: 0, minY: 0, width: 94.89, height: 16 }}
        fill={color.black}
      />
    </HeaderTitle>
  );
};
