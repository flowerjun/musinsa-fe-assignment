import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AutocompleteProps } from 'src/@types/Autocomplete';
import { color, font } from 'src/theme/theme';
import { iconImagePath, SVGIcon } from 'src/assets/assets-path';

// ----------------------------------------------------------------------

const AutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 375px;

  background-color: ${color.gray1};
`;

const SearchInputWrapper = styled.div`
  position: relative;
  padding: 20px 15px;
`;

const SearchInput = styled.input`
  width: 345px;
  height: 40px;
  padding: 8px 10px 8px 36px;

  border: 1px solid ${color.gray5};
  color: ${color.black};
  background-color: ${color.white};
  font-size: 16px;
  line-height: 24px;

  ::placeholder {
    color: ${color.oldGray6};
  }
`;

const AutoCompleteList = styled.div`
  width: 375px;
  text-align: left;
  padding: 5px 15px;
  background-color: ${color.white};

  font-size: ${font.defaultSize}px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  cursor: pointer;
`;

export default function Autocomplete({ options, onSelect }: AutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;

    setSearchTerm(newTerm);
    
    const newFilteredOptions = options.filter((option) =>
      option?.toLowerCase()?.startsWith(newTerm.toLowerCase())
    );
    
    setFilteredOptions(newFilteredOptions);
  };

  const handleSelectOption = (option: string) => {
    setSearchTerm(option);
    setFilteredOptions(options);
    onSelect(option);
  };

  return (
    <AutocompleteWrapper>
      <SearchInputWrapper>
        <SVGIcon
          icon={iconImagePath.searchIcon}
          size={22}
          boxSize={{ width: 22, height: 22 }}
          viewBox={{ width: 22, height: 22, minX: 0, minY: 0 }}
          fill={color.gray2}
          style={{ position: 'absolute', left: 25, bottom: 29}}
        />

        <label htmlFor='autocomplete' style={{ display: 'none' }}>
          자동완성
        </label>
        <SearchInput
          autoComplete='off'
          id='autocomplete'
          type='text'
          placeholder='상품명 검색'
          value={searchTerm}
          onChange={handleInputChange}
        />
      </SearchInputWrapper>

      {searchTerm !== '' &&
        filteredOptions.map((option) => (
          <AutoCompleteList key={option} onClick={() => handleSelectOption(option)}>
            {option}
          </AutoCompleteList>
        ))}
    </AutocompleteWrapper>
  );
};
