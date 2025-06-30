'use client';

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function ImageUpload() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="item-image"
        className="flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition"
      >
        <PhotoIcon className="h-5 w-5" />
        {fileName ? (
          <span className="truncate">{fileName}</span>
        ) : (
          <span>Select an image</span>
        )}
      </label>

      <input
        id="item-image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
