import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '../ui/dialog/Dialog';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Button from '../ui/Buttons/ButtonsProp';

type CreditDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onBuy: () => void;
};

const CreditDialog = ({ isOpen, onClose, onBuy }: CreditDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Oops, no credits left!</h3>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="py-4">
          <div className="flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-12 h-12 text-red-500" />
          </div>
          <p className="text-gray-700 text-lg">
            It looks like you don&apos;t have any credits left to use our services. Please purchase more credits to continue.
          </p>
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="flex justify-end gap-4">
          <Button onClick={onBuy} variant="primary">
            Buy Now
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default CreditDialog;