import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import Sidebar from './Sidebar';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 bg-gray-300 dark:bg-zinc-800 opacity-80" />
        <Dialog.Content className="fixed top-0 left-0 right-0 pt-5 pl-5 bg-gray-50 dark:bg-zinc-800 text-black dark:text-white flex flex-col">
          <Dialog.Close className="p-5 -ml-5 mb-5 self-start">
            <Cross1Icon />
          </Dialog.Close>
          <Sidebar isMobile />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
