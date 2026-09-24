'use client';
import { Toaster } from 'sonner';
import { PlanProvider } from '@/context/PlanContext';
export default function Providers({ children }) {
  return <PlanProvider>{children}<Toaster theme="dark" position="bottom-right" richColors closeButton /></PlanProvider>;
}
