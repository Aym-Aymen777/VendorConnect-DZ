import { useContext,useState,useEffect } from "react";
import { createContext } from "react";


const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    marketplace: 'Marketplace',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    search: 'Search products...',
    categories: 'Categories',
    wishlist: 'Wishlist',
    orders: 'Orders',
    chat: 'Chat',
    profile: 'Profile',
    logout: 'Logout',
    addProduct: 'Add Product',
    manageProducts: 'Manage Products',
    subscription: 'Subscription',
    analytics: 'Analytics',
    users: 'Users',
    promotions: 'Promotions',
    welcome: 'Welcome to Our Marketplace',
    getQuote: 'Get Quote',
    promoted: 'PROMOTED',
    recentOrders: 'Recent Orders',
    yourProducts: 'Your Products',
    totalUsers: 'Total Users',
    totalSales: 'Total Sales'
  },
  ar: {
    marketplace: 'السوق الإلكتروني',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    dashboard: 'لوحة التحكم',
    search: 'البحث عن المنتجات...',
    categories: 'الفئات',
    wishlist: 'المفضلة',
    orders: 'الطلبات',
    chat: 'المحادثة',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    addProduct: 'إضافة منتج',
    manageProducts: 'إدارة المنتجات',
    subscription: 'الاشتراك',
    analytics: 'التحليلات',
    users: 'المستخدمون',
    promotions: 'العروض الترويجية',
    welcome: 'مرحباً بك في سوقنا الإلكتروني',
    getQuote: 'طلب عرض سعر',
    promoted: 'مُروَّج',
    recentOrders: 'الطلبات الأخيرة',
    yourProducts: 'منتجاتك',
    totalUsers: 'إجمالي المستخدمين',
    totalSales: 'إجمالي المبيعات'
  },
  fr: {
    marketplace: 'Place de Marché',
    login: 'Connexion',
    register: 'S\'inscrire',
    dashboard: 'Tableau de bord',
    search: 'Rechercher des produits...',
    categories: 'Catégories',
    wishlist: 'Liste de souhaits',
    orders: 'Commandes',
    chat: 'Chat',
    profile: 'Profil',
    logout: 'Déconnexion',
    addProduct: 'Ajouter un produit',
    manageProducts: 'Gérer les produits',
    subscription: 'Abonnement',
    analytics: 'Analytiques',
    users: 'Utilisateurs',
    promotions: 'Promotions',
    welcome: 'Bienvenue sur notre place de marché',
    getQuote: 'Obtenir un devis',
    promoted: 'PROMU',
    recentOrders: 'Commandes récentes',
    yourProducts: 'Vos produits',
    totalUsers: 'Total des utilisateurs',
    totalSales: 'Total des ventes'
  }
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    setIsRTL(language === 'ar');
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};