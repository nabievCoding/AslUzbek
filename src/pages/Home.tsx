import { useState, useEffect, useMemo } from 'react';
import SearchBar from "@/components/SearchBar";
import { AddWordDialog } from '@/components/AddWordDialog';
import { AuthDialog } from '@/components/AuthDialog';
import EditWord from '@/components/EditWord';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeftRight, BookOpen, Loader2, Pencil, Trash2, X, LogOut, Lock, User, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { wordsApi } from  '../lib/api/words';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Word {
  id: string;
  asluzb: string;
  zamon: string;
  izoh?: string;
}

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [direction, setDirection] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const fetchWords = async () => {
    setIsLoading(true);
    try {
      const data = await wordsApi.getAll();
      setWords(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const filteredWords = useMemo(() => {
    if (!searchTerm.trim()) return words;
    const term = searchTerm.toLowerCase();
    return words.filter((word) =>
      word.zamon?.toLowerCase().includes(term) ||
      word.asluzb?.toLowerCase().includes(term)
    );
  }, [searchTerm, words]);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    toast.success('Boshqaruv panelidan chiqdingiz');
  };

  const handleEdit = (word: Word) => {
    setSelectedWord(word);
    setEditOpen(true);
  };

  const handleDelete = (word: Word) => {
    setSelectedWord(word);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedWord) return;
    try {
      await wordsApi.delete(selectedWord.id);
      toast.success("So'z muvaffaqiyatli o'chirildi!");
      setDeleteDialogOpen(false);
      setSelectedWord(null);
      fetchWords();
    } catch (err) {
      console.error(err);
      toast.error("So'zni o'chirishda xatolik yuz berdi");
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedWord(null);
    fetchWords();
  };

  const handleEditSave = async (updatedWord: Omit<Word, 'id'>) => {
    if (!selectedWord) return;
    try {
      await wordsApi.update(selectedWord.id, updatedWord);
      toast.success("So'z muvaffaqiyatli yangilandi!");
      handleEditClose();
    } catch (err) {
      console.error(err);
      toast.error("So'zni yangilashda xatolik yuz berdi");
    }
  };

  if (isEditOpen) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">So'zni Tahrirlash</h2>
            <Button 
              variant="outline" 
              onClick={handleEditClose}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Chiqish
            </Button>
          </div>
          <EditWord 
            word={selectedWord}
            onSave={handleEditSave}
            onCancel={handleEditClose}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">O'zbek Lug'ati</h1>
              <p className="text-xs text-muted-foreground">Zamonaviy ↔ Asl O'zbek</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isAdmin ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAuthDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <LogIn className="h-3 w-3" />
                
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-3 w-3" />
                </Button>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero */}
        <div className="text-center py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Ona Tilimizni Saqlaymiz</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zamonaviy so'zlarning asl o'zbek tilida qanday aytilishini bilib oling
          </p>
        </div>

        {/* Search Section - STICKY */}
        <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-4">
          <div className="container mx-auto px-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddWord={() => setAddDialogOpen(true)}
              onDirectionToggle={() => setDirection(!direction)}
              showAddButton={isAdmin}
            />
          </div>
        </div>

        {/* Results - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-3xl mx-auto">
              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold mb-2 text-destructive">Xatolik yuz berdi</h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
              )}

              {!isLoading && !error && (
                filteredWords.length > 0 ? (
                  <div className="space-y-4">
                    {filteredWords.map((word) => (
                      <Card key={word.id} className="bg-card border-border hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-3">
                            {isAdmin && (
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-primary hover:bg-primary/10"
                                  onClick={() => handleEdit(word)}
                                  title="Tahrirlash"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDelete(word)}
                                  title="O'chirish"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                            
                            <div className="flex-1">
                              <div className="text-sm font-medium text-muted-foreground mb-1">
                                {!direction ? "Zamonaviy" : 'Asl O`zbek'}
                              </div>
                              <div className="text-xl font-semibold gradient-text">
                                {!direction ? word.zamon : word.asluzb}
                              </div>
                            </div>

                            <ArrowLeftRight className="h-6 w-6 text-primary flex-shrink-0" />

                            <div className="flex-1">
                              <div className="text-sm font-medium text-muted-foreground mb-1">
                                {direction ? "Zamonaviy" : 'Asl O`zbek'}
                              </div>
                              <div className="text-xl font-semibold gradient-text">
                                {direction ? word.zamon : word.asluzb}
                              </div>
                            </div>
                          </div>

                          {word.izoh && (
                            <div className="pt-3 border-t border-border">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {word.izoh}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">So'z topilmadi</h3>
                    <p className="text-muted-foreground">Iltimos, boshqa so'z bilan qidirib ko'ring</p>
                    
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>O'zbek Lug'ati © 2025 - Barcha huquqlar himoyalangan</p>
        </div>
      </footer>

      {/* Dialogs */}
      <AuthDialog 
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onLoginSuccess={handleLoginSuccess}
      />

      {isAdmin && (
        <>
          <AddWordDialog 
            open={addDialogOpen} 
            onOpenChange={setAddDialogOpen}
          />

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>So'zni o'chirish</AlertDialogTitle>
                <AlertDialogDescription>
                  Haqiqatan ham bu so'zni o'chirmoqchimisiz?
                </AlertDialogDescription>
              </AlertDialogHeader>

              {selectedWord && (
                <div className="my-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Asl O'zbek</div>
                      <div className="font-semibold">{selectedWord.asluzb}</div>
                    </div>
                    <ArrowLeftRight className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Zamonaviy</div>
                      <div className="font-semibold">{selectedWord.zamon}</div>
                    </div>
                  </div>
                  {selectedWord.izoh && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-muted-foreground">Izoh</div>
                      <div className="font-semibold">{selectedWord.izoh}</div>
                    </div>
                  )}
                </div>
              )}

              <AlertDialogFooter>
                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                  O'chirish
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}