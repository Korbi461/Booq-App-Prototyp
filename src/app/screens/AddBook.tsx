import { useState } from 'react';
import { Upload, Camera, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function AddBook() {
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="px-6 pt-2 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Add a Book
        </h2>
        <p className="text-gray-600 text-sm mt-1">Share your favorite reads</p>
      </div>
      
      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-32">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-8 mb-6 transition-all ${
            dragActive 
              ? 'border-black bg-gray-100' 
              : 'border-gray-300 bg-white'
          }`}
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Upload size={32} className="text-gray-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Book Cover</h3>
            <p className="text-gray-600 text-sm mb-4">
              Drag and drop or click to browse
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-black text-white rounded-full font-medium">
              Choose File
            </button>
          </div>
        </motion.div>
        
        {/* Alternative Options */}
        <div className="space-y-4 mb-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <Camera size={28} className="text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold mb-1">Scan Book Barcode</h4>
              <p className="text-gray-600 text-sm">Use your camera to scan ISBN</p>
            </div>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <BookOpen size={28} className="text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold mb-1">Manual Entry</h4>
              <p className="text-gray-600 text-sm">Enter book details manually</p>
            </div>
          </motion.button>
        </div>
        
        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-4"
        >
          <p className="text-sm text-gray-700">
            <span className="font-semibold">💡 Tip:</span> Add books to help others discover great reads and build a community-driven library.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
