import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onLoginSuccess: (user: { email: string; name?: string }, token: string) => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  const submit = async () => {
    try {
      setLoading(true);
      setError('');
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: mode === 'register' ? name : undefined })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      onLoginSuccess(data.user, data.token);
      onOpenChange(false);
    } catch (e: any) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      // Use Google Identity Services popup
      /* global google */
      // @ts-ignore
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        setError('Google client not configured');
        setLoading(false);
        return;
      }
      // @ts-ignore
      const tokenPromise: Promise<string> = new Promise((resolve, reject) => {
        // @ts-ignore
        google.accounts.id.initialize({ client_id: clientId, callback: (resp: any) => resolve(resp.credential) });
        // @ts-ignore
        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            reject(new Error('Google sign-in canceled'));
          }
        });
      });
      const idToken = await tokenPromise;
      const res = await fetch(API_BASE + '/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google sign-in failed');
      onLoginSuccess(data.user, data.token);
      onOpenChange(false);
    } catch (e: any) {
      setError(e.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Sign In' : 'Create Account'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && <div className="text-sm text-destructive">{error}</div>}
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button onClick={submit} disabled={loading} className="w-full">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
          <div className="text-center text-sm">
            {mode === 'login' ? (
              <button className="underline" onClick={() => setMode('register')}>Need an account? Register</button>
            ) : (
              <button className="underline" onClick={() => setMode('login')}>Have an account? Sign In</button>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
          </div>
          <Button variant="outline" onClick={googleSignIn} disabled={loading} className="w-full">
            <LogIn className="h-4 w-4 mr-2" /> Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


