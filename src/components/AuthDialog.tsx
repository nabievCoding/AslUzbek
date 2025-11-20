import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Lock, User } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

export function AuthDialog({ open, onOpenChange, onLoginSuccess }: AuthDialogProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_CREDENTIALS = {
    username: 'Jannat_Kaliti',
    password: '20112025'
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error('Iltimos, Sir va Kalitni kiriting');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('isAdmin', 'true');
        toast.success('Boshqaruv sahifasiga muvaffaqiyatli kirdingiz!');
        onLoginSuccess();
        onOpenChange(false);
        setUsername('');
        setPassword('');
      } else {
        toast.error('Noto‘g‘ri Sir yoki Kalit');
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Boshqaruvga Kirish</DialogTitle>
          <DialogDescription className="text-center">
            Boshqaruvchi sahifasiga kirish uchun ma'lumotlaringizni kiriting
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-base">
              Sir
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="Siringizni kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 text-base pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">
              Kalit
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Kalitingizni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 text-base pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="h-12 text-base"
          >
            {loading ? 'Tekshirilmoqda...' : 'Kirish'}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
           
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}