import { useState } from 'react';
import styled from 'styled-components';

import { FilterLabel, IFilter, IHeaderFilters } from 'src/@types/Filter';
import { color } from 'src/theme/theme';
import { iconImagePath, SVGIcon } from 'src/assets/assets-path';
import uuidv4 from 'src/util/uuidv4';

import Autocomplete from './Autocomplete';
import FilterButton from './FilterButton';
import FilterChip from './FilterChip';

// ----------------------------------------------------------------------

const HeaderFilterWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 375px;
  height: auto;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);

  background-color: ${color.white};
  z-index: 100;
`;

const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 10px 7px;
`;

const FilterChips = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 10px 7px;
  overflow-x: scroll;
  
  div {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
`;

const FilterBorder = styled.div`
  width: 373px;
  height: 10px;
  background-color: ${color.oldGray3};
`;

const filterLabels: FilterLabel[] = [
  {
    label: '세일상품',
    id: 'sale',
  },
  {
    label: '단독상품',
    id: 'exclusive',
  },
  {
    label: '품절포함',
    id: 'soldOut',
  },
];

export default function HeaderFilters({
  goods,
  filter,
  setFilter,
  handleFilterChange,
}: IHeaderFilters) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const getGoodsNames = new Set<string>([
    ...goods.map((good) => good.goodsName.split(' ')).flat(1),
    ...goods.map((good) => good.brandName),
  ]);
  const goodsNames = [...Array.from(getGoodsNames)];

  const deactivateAllFilters = (filter: IFilter) => {
    setSearchKeyword('');

    return {
      exclusive: false,
      sale: false,
      soldOut: false,
      search: false,
      searchKeyword: '',
    };
  };

  const handleResetFilters = () => {
    const newFilter = deactivateAllFilters(filter);

    setFilter(newFilter);
  };

  const handleSelect = (keyword: string) => {
    setSearchKeyword(keyword);

    setFilter((prevState) => ({
      ...prevState,
      search: false,
      searchKeyword: keyword,
    }));
  };

  return (
    <HeaderFilterWrapper>
      <FilterButtons>
        {[{ label: '검색', id: 'search' as keyof IFilter }, ...filterLabels].map(
          (filterLabel: FilterLabel) => (
            <FilterButton
              key={uuidv4()}
              id={filterLabel.id}
              label={filterLabel.label}
              keyword={searchKeyword}
              icon={iconImagePath.searchIcon}
              active={!!filter[filterLabel.id]}
              onButtonFilter={() => handleFilterChange(filterLabel.id)}
            />
          )
        )}
      </FilterButtons>

      {filter.search && <Autocomplete options={goodsNames} onSelect={handleSelect} />}
      
      {(searchKeyword ||
        filter.exclusive ||
        filter.sale ||
        filter.soldOut ||
        filter.searchKeyword) && (
        <FilterChips>
          <div>
            {filterLabels.map((filterLabel) =>
              filter[filterLabel.id] ? (
                <FilterChip
                  key={uuidv4()}
                  label={filterLabel.label}
                  onChipClose={() => handleFilterChange(filterLabel.id)}
                />
              ) : null
            )}
            {searchKeyword && (
              <FilterChip
                label={searchKeyword}
                onChipClose={() => {
                  setSearchKeyword('');
                  setFilter((prevState) => ({
                    ...prevState,
                    search: false,
                    searchKeyword: '',
                  }));
                }}
              />
            )}
          </div>

          <SVGIcon
            onClick={handleResetFilters}
            icon={iconImagePath.refreshIcon}
            size={22}
            boxSize={{ width: 22, height: 22 }}
            viewBox={{ width: 22, height: 22, minX: 0, minY: 0 }}
            fill={color.gray2}
            style={{ cursor: 'pointer' }}
          />
        </FilterChips>
      )}
      <FilterBorder />
    </HeaderFilterWrapper>
  );
};
