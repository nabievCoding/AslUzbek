import { useState } from 'react';
import { wordsApi } from '@/lib/api/words'; // to'g'ridan-to'g'ri wordsApi
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

interface AddWordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWordDialog({ open, onOpenChange }: AddWordDialogProps) {
  const [modern, setModern] = useState('');
  const [traditional, setTraditional] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!modern.trim() || !traditional.trim()) {
      toast.error("Iltimos, kamida zamonaviy va asl o'zbek so'zlarni kiriting");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await wordsApi.create({
        zamon: modern.trim(),
        asluzb: traditional.trim(),
        izoh : description.trim() || null,
      });
      toast.success("So'z muvaffaqiyatli qo'shildi!");
      // Reset form
      setModern('');
      setTraditional('');
      setDescription('');
      setShowConfirmation(false);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "So'z qo'shishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Yangi So'z Qo'shish</DialogTitle>
            <DialogDescription>
              Lug'atga yangi so'z qo'shing. Barcha maydonlarni to'ldiring.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="modern" className="text-base">
                Zamonaviy So'z
              </Label>
              <Input
                id="modern"
                placeholder="Masalan: Kompyuter"
                value={modern}
                onChange={(e) => setModern(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="traditional" className="text-base">
                Asl O'zbek So'z
              </Label>
              <Input
                id="traditional"
                placeholder="Masalan: Bigasayyor"
                value={traditional}
                onChange={(e) => setTraditional(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Izoh (ixtiyoriy)
              </Label>
              <Textarea
                id="description"
                placeholder="So'z haqida qisqacha ma'lumot..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] text-base resize-none"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleAdd} className="bg-accent hover:bg-accent/90">
              Qo'shish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>So'zni tasdiqlang</AlertDialogTitle>
            <AlertDialogDescription>
              Yangi so'z quyidagicha ko'rinadi:
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">Zamonaviy</div>
                <div className="text-lg font-semibold">{modern}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">Asl O'zbek</div>
                <div className="text-lg font-semibold gradient-text">{traditional}</div>
              </div>
            </div>
            {description && (
              <div className="pt-2 mt-2 border-t border-border">
                <div className="text-sm text-muted-foreground">{description}</div>
              </div>
            )}
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Tahrirlash</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-accent hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? 'Yuklanmoqda...' : 'Tasdiqlash'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
