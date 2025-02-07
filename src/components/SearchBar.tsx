
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search grants..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
      if (searchTerm.length > 0) {
        toast({
          title: "Searching grants...",
          description: `Looking for grants matching "${searchTerm}"`,
          duration: 2000,
        });
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch, toast]);

  return (
    <div className="relative w-full max-w-xl animate-fade-in group">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400 transition-colors group-focus-within:text-purple-600" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        className="pl-10 h-12 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm transition-all duration-300 focus:shadow-md focus:border-purple-300 focus:ring-purple-300"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
