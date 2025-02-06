import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search grants..." }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-xl animate-fade-in">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 h-12 bg-white/80 backdrop-blur-sm border border-input shadow-sm transition-all duration-300 focus:shadow-md"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};