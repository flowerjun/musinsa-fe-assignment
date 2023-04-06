export interface AutocompleteProps {
  options: string[];
  onSelect: (value: string) => void;
}