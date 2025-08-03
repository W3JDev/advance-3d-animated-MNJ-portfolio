import React from 'react';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';
import { SafeMagneticButton } from './SafeMagneticButton';

interface NavigationProps {
  onContactClick: () => void;
}

export function Navigation({ onContactClick }: NavigationProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <SafeMagneticButton>
        <Button
          onClick={onContactClick}
          size="sm"
          className="glass-effect hover:bg-white/20 text-white border-white/20"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Contact
        </Button>
      </SafeMagneticButton>
    </div>
  );
}