import styled from 'styled-components';

import { IFilterChip } from 'src/@types/Filter';
import { color } from 'src/theme/theme';
import { iconImagePath, SVGIcon } from 'src/assets/assets-path';

// ----------------------------------------------------------------------

const FilterChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  width: fit-content;
  height: 26px;
  gap: 4px;

  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${color.white};
  background: ${color.accent};
  border-radius: 4px;
  cursor: pointer;
`;

export default function FilterChip({ label, onChipClose }: IFilterChip) {
  return (
    <FilterChipWrapper onClick={onChipClose}>
      <span>{label}</span>
      <span onClick={onChipClose}>
        <SVGIcon
          onClick={onChipClose}
          icon={iconImagePath.deleteIcon}
          fill={color.white}
          size={14}
          boxSize={{ width: 14, height: 14 }}
          viewBox={{ width: 14, height: 14, minX: 0, minY: 0 }}
        />
      </span>
    </FilterChipWrapper>
  );
};
