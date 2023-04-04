import styled from 'styled-components';

import { IGoodsLabel } from 'src/@types/Goods';
import { color } from 'src/theme/theme';

// ----------------------------------------------------------------------

const Label = styled.span<{ color: string }>`
  position: absolute;
  width: 33px;
  height: 26px;
  bottom: 127px;
  left: 10px;
  padding: 4px 6px;
  text-align: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${color.white};
  background-color: ${({ color }) => color};
`;

export default function GoodsLabel({ label, color }: IGoodsLabel) {
  return <Label color={color}>{label}</Label>;
}
