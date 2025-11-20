import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, KeyRound, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAdmin, login, logout } = useAuthStore();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Iltimos, sir va kalit kiriting");
      return;
    }

    const success = login(username, password);
    if (success) {
      toast.success("Xush kelibsiz, Boshqaruvchi!");
      setUsername('');
      setPassword('');
      onOpenChange(false);
    } else {
      toast.error("Sir yoki Kalit noto'g'ri!");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Tizimdan chiqdingiz");
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAdmin) {
      handleLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        {isAdmin ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Boshqaruvchi Panel</DialogTitle>
              <DialogDescription>
                Siz boshqaruvchi sifatida tizimga kirdingiz
              </DialogDescription>
            </DialogHeader>
            
      
            <DialogFooter>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Chiqish
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Boshqaruvga Kirish</DialogTitle>
              <DialogDescription>
                Boshqaruvchi sahifasiga kirish uchun ma'lumotlarni kiriting
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-5 py-4" onKeyPress={handleKeyPress}>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sir
                </Label>
                <Input
                  id="username"
                  placeholder="Foydalanuvchi nomi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 text-base"
                  autoComplete="username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base flex items-center gap-2">
                  <KeyRound className="h-4 w-4" />
                  Kalit
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="kalit"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base"
                  autoComplete="current-password"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90">
                Kirish
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
