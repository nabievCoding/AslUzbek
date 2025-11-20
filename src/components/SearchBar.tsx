import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Plus } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddWord: () => void;
  onDirectionToggle: () => void;
  showAddButton: boolean;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  onAddWord,
  onDirectionToggle,
  showAddButton
}: SearchBarProps) {
  const handleInputFocus = () => {
    setTimeout(() => {
      const searchElement = document.getElementById('search-input');
      searchElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };
  return (
    <div style={{position:'relative'}} className=" flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl mx-auto">
      {/* Search Input - takes most space */}
      <div className="flex-1 w-full">
        <Input
          placeholder="So'z qidirish (zamonaviy yoki asl o'zbek)..."
          value={searchTerm}
          id="search-input"
          onFocus={handleInputFocus}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 text-base shadow-sm"
        />
      </div>

      {/* Direction Toggle Button */}
      <Button
        variant="outline"
        onClick={onDirectionToggle}
        className="px-2 border-2"
        style={{position:'absolute',borderRadius:50, right:20,bottom:160, width:50,height:50}}
      >
        <ArrowLeftRight className="" />

      </Button>

      {/* Add Word Button (only for admin) */}
      {showAddButton && (
        <Button
          onClick={onAddWord}
          className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Qo'shish
        </Button>
      )}
    </div>
  );
}