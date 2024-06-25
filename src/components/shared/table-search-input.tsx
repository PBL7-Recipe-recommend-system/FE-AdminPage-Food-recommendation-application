import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../ui/input';

export default function TableSearchInput({
  placeholder,
}: {
  placeholder?: string;
  handleChangeText?: (text) => void;
}) {
  const [searchParams] = useSearchParams();
  const country = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = React.useState(country);
  // debounce the search input



  return (
    <Input
      placeholder={placeholder}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className="w-full md:max-w-sm"
    />
  );
}
