import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

export default function ImageUploader({ image, preview, onImageSelect, onRemove }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) return;
    
    const objectUrl = URL.createObjectURL(file);
    onImageSelect(file, objectUrl);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onRemove();
  };

  return (
    <div className="w-full transition-all">
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-heritage-500 bg-heritage-50 dark:bg-heritage-900/30' : 'border-stone-300 dark:border-stone-600 hover:border-heritage-400 dark:hover:border-heritage-600 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
        >
          <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-full mb-4">
            <Upload className="w-8 h-8 text-stone-500 dark:text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-800 dark:text-stone-100 mb-1">Upload an image</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">Drag & drop or click to upload</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="relative border border-stone-200 dark:border-stone-700 rounded-2xl overflow-hidden bg-stone-50 dark:bg-stone-800 p-2 animate-fade-in">
          <div className="relative w-full flex justify-center bg-black/5 rounded-xl overflow-hidden">
            <img src={preview} alt="Upload preview" className="object-contain max-h-64 w-auto" />
            <button 
              onClick={handleRemove}
              className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mt-3 px-2 flex justify-between items-center pb-1">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-200 truncate max-w-[200px]">
              {image?.name || 'Image'}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {image ? (image.size / 1024 / 1024).toFixed(2) + ' MB' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
