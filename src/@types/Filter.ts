import { Dispatch, FC, SVGProps, SetStateAction } from "react";
import { IGoods } from "./Goods";

// ----------------------------------------------------------------------

export interface IFilter {
  exclusive: boolean;
  sale: boolean;
  soldOut: boolean;
  search: boolean;
  searchKeyword: string;
}

export interface IHeaderFilters {
  goods: IGoods[];
  filter: IFilter;
  setFilter: Dispatch<SetStateAction<IFilter>>;
  handleFilterChange: (name: keyof IFilter) => void;
}

export interface IFilterButton {
  label: string;
  id: keyof IFilter;
  keyword: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  active: boolean;
  onButtonFilter: (name: keyof IFilter) => void;
}

export interface IFilterChip {
  label: string;
  onChipClose: VoidFunction;
}

export interface FilterLabel {
  label: string;
  id: keyof IFilter;
}
