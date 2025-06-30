'use client';
import { Dispatch, SetStateAction } from 'react';
import ImageUpload from '@/components/ui/menu/imgaeupload';
interface AddMenuItemDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DialogMenu({ open, setOpen }: AddMenuItemDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-full max-w-md p-6 border border-gray-200" role="dialog" aria-modal="true">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none cursor-pointer"
        onClick={() => setOpen(false)}
        aria-label="Close dialog"
      >
        &times;
      </button>
      <h3 className="text-lg font-semibold mb-4">Add New Menu Item</h3>
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input id="item-name" name="name" type="text" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Cappuccino" />
        </div>
        <div>
          <label htmlFor="item-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea id="item-description" name="description" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Short description" rows={2} />
        </div>
        <div>
          <label htmlFor="item-price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input id="item-price" name="price" type="number" min="0" step="0.01" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 3.50" />
        </div>
        <div>
          <label htmlFor="item-image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <ImageUpload />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none cursor-pointer"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
} 