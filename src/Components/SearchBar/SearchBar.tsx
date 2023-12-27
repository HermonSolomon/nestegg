type SearchBarProps = {
  onChange: (value: string) => void;
};

const SearchBox = ({ onChange }: SearchBarProps) => {
  return (
    <div className="pt-2 mx-auto text-gray-600">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-4 rounded-3xl text-sm focus:outline-none w-96 mb-4"
        type="search"
        name="search"
        placeholder="Search a movie or a series"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
