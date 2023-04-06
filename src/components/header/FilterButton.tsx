import styled from 'styled-components';

import { IFilter, IFilterButton } from 'src/@types/Filter';
import { color } from 'src/theme/theme';
import { SVGIcon } from 'src/assets/assets-path';

// ----------------------------------------------------------------------

const FilterButtonWrapper = styled.button<{ id: keyof IFilter; active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  height: 35px;
  padding: 7px 15px 7px 15px;
  gap: 5px;

  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  background-color: ${color.white};
  color: ${({ active }) => (active ? color.accent : color.black)};
  border: 1px solid ${color.gray4};
  border-radius: 18px;
  cursor: pointer;
`;

export default function FilterButton({ label, id, icon, active, onButtonFilter }: IFilterButton) {
  return (
    <FilterButtonWrapper id={id} active={active} onClick={() => onButtonFilter(id)}>
      <span>{label}</span>
      {id === 'search' && (
        <SVGIcon
          icon={icon}
          size={18}
          boxSize={{ width: 18, height: 18 }}
          viewBox={{ width: 18, height: 18, minX: 0, minY: 0 }}
          fill={color.gray2}
        />
      )}
    </FilterButtonWrapper>
  );
}
