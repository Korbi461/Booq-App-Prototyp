import { useState, useEffect } from 'react';
import { Book } from '../data/books';
import { Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export function Cart() {
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  
  useEffect(() => {
    // Load cart from localStorage
    const cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
    const liked = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    const superLiked = JSON.parse(localStorage.getItem('superLikedBooks') || '[]');
    
    const allBooks = [...liked, ...superLiked];
    const items = allBooks.filter((book: Book) => cartIds.includes(book.id));
    
    setCartItems(items);
    setCart(cartIds);
  }, []);
  
  const removeFromCart = (bookId: string) => {
    const newCart = cart.filter(id => id !== bookId);
    setCart(newCart);
    setCartItems(cartItems.filter(book => book.id !== bookId));
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  const total = cartItems.reduce((sum, book) => sum + book.price, 0);
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="px-6 pt-2 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Shopping Cart
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600">Add some books from your bookshelf!</p>
          </div>
        ) : (
          <div className="space-y-4 pb-64">
            {cartItems.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-4 flex gap-4"
              >
                <div className="w-20 h-28 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold line-clamp-2 mb-1">{book.title}</h4>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${book.price}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(book.id)}
                      className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Checkout Footer */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 p-6 z-40">
          <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-6 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl">${total.toFixed(2)}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-gray-800 to-black text-white rounded-full font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Proceed to Checkout
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
