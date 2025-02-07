
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string, startDate?: Date | null, endDate?: Date | null) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search grants..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm, startDate, endDate);
      if (searchTerm.length > 0 || startDate || endDate) {
        toast({
          title: "Searching grants...",
          description: `Looking for grants matching "${searchTerm}"${startDate ? ` from ${format(startDate, 'PP')}` : ''}${endDate ? ` to ${format(endDate, 'PP')}` : ''}`,
          duration: 2000,
        });
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, startDate, endDate, onSearch, toast]);

  return (
    <div className="flex gap-4 items-center w-full max-w-4xl animate-fade-in group">
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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-12 border border-purple-100 justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PP") : <span>Start Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DatePicker
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-12 border border-purple-100 justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "PP") : <span>End Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DatePicker
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
