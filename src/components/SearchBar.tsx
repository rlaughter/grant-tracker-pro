
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string, startDate?: Date | null, endDate?: Date | null) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search grants..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const parsedStartDate = startDate ? new Date(startDate) : null;
      const parsedEndDate = endDate ? new Date(endDate) : null;
      
      onSearch(searchTerm, parsedStartDate, parsedEndDate);
      
      // Only show toast when there's a search term
      if (searchTerm.length > 0) {
        toast({
          title: "Searching grants...",
          description: `Looking for grants matching "${searchTerm}"${startDate ? ` from ${startDate}` : ''}${endDate ? ` to ${endDate}` : ''}`,
          duration: 2000,
        });
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, startDate, endDate, onSearch, toast]);

  return (
    <div className="flex gap-4 items-center w-full max-w-5xl mx-auto mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400 transition-colors group-focus-within:text-purple-600" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          className="pl-10 h-12 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm transition-all duration-300 focus:shadow-md focus:border-purple-300 focus:ring-purple-300"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Input
        type="date"
        placeholder="Start Date"
        value={startDate}
        className="h-12 w-40 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm transition-all duration-300 focus:shadow-md focus:border-purple-300 focus:ring-purple-300"
        onChange={(e) => setStartDate(e.target.value)}
      />
      
      <Input
        type="date"
        placeholder="End Date"
        value={endDate}
        className="h-12 w-40 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm transition-all duration-300 focus:shadow-md focus:border-purple-300 focus:ring-purple-300"
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
};
