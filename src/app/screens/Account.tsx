import { User, Settings, Bell, Heart, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export function Account() {
  const menuItems = [
    { icon: User, label: 'Edit Profile', color: 'from-blue-100 to-cyan-100', iconColor: 'text-blue-600' },
    { icon: Settings, label: 'Preferences', color: 'from-purple-100 to-pink-100', iconColor: 'text-purple-600' },
    { icon: Bell, label: 'Notifications', color: 'from-green-100 to-emerald-100', iconColor: 'text-green-600' },
    { icon: Heart, label: 'Reading Goals', color: 'from-red-100 to-pink-100', iconColor: 'text-red-600' },
    { icon: CreditCard, label: 'Payment Methods', color: 'from-orange-100 to-yellow-100', iconColor: 'text-orange-600' },
    { icon: HelpCircle, label: 'Help & Support', color: 'from-indigo-100 to-purple-100', iconColor: 'text-indigo-600' },
  ];
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="px-6 pt-2 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Account
        </h2>
        <p className="text-gray-600 text-sm mt-1">Manage your profile & settings</p>
      </div>
      
      {/* Profile Section */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-xl">John Doe</h3>
              <p className="text-gray-600 text-sm">john.doe@email.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="font-bold text-xl">47</div>
              <div className="text-gray-600 text-xs">Books Read</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">12</div>
              <div className="text-gray-600 text-xs">Wishlist</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">8</div>
              <div className="text-gray-600 text-xs">Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-3 pb-32">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <item.icon size={24} className={item.iconColor} />
              </div>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              <div className="text-gray-400">›</div>
            </motion.button>
          ))}
          
          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: menuItems.length * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 flex items-center gap-4 border border-red-200"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <LogOut size={24} className="text-red-600" />
            </div>
            <span className="flex-1 text-left font-medium text-red-600">Sign Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
