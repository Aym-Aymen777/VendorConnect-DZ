import { useState, useEffect, useCallback } from "react";
import {
  useParams,
  useNavigate,
  Link /*  useLocation */,
} from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  User,
  Shield,
  Package,
  Menu,
  Store,
  CreditCard,
  Megaphone,
  Heart,
  MessageCircle,
  FileText,
  Bell,
  File,
  Users,
  HelpCircle,
  Save,
  Edit3,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  Loader2,
  Globe,
  ChevronDown,
  MapPin,
  Share2,
} from "lucide-react";
import Header from "../common/Header";
import { useTranslation } from "react-i18next";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { toast } from "sonner";
import { formatDate } from "../../utils/formatDate.js";
import useUserStore from "../../store/UserStore.js";
import { countries } from "../../utils/countries.js";
import UpdateCompanyInfos from "./UpdateCompanyInfos.jsx";

export default function ProfileSettings() {
  const { tab: urlTab } = useParams(); // Get tab from URL params
  const navigate = useNavigate();
  /*  const location = useLocation(); */
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState(false);

  const { user } = useAuthCheck();
  const { updateUser, getOrders } = useUserStore();
  const [accountInfos, setAccountInfos] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    country: "",
    socialLinks: {
      instagram: "",
      tiktok: "",
      facebook: "",
      twitter: "",
      youtube: "",
    },
    bio: "",
  });

  // When `user` becomes available, seed the form
  useEffect(() => {
    if (user) {
      // Convert array of social links to object format for easier handling
      const socialLinksObj = {
        instagram: user.profile?.socialLinks
          ? user.profile.socialLinks.find(
              (link) => link.platform === "instagram"
            )?.url
          : "",
        tiktok: user.profile?.socialLinks
          ? user.profile.socialLinks.find((link) => link.platform === "tiktok")
              ?.url
          : "",
        facebook: user.profile?.socialLinks
          ? user.profile.socialLinks.find(
              (link) => link.platform === "facebook"
            )?.url
          : "",
        twitter: user.profile?.socialLinks
          ? user.profile.socialLinks.find((link) => link.platform === "twitter")
              ?.url
          : "",
        youtube: user.profile?.socialLinks
          ? user.profile.socialLinks.find((link) => link.platform === "youtube")
              ?.url
          : "",
      };

      // If user has socialLinks array, convert it to object format
      if (
        user.profile?.socialLinks &&
        Array.isArray(user.profile.socialLinks)
      ) {
        user.profile.socialLinks.forEach((link) => {
          if (link.platform && link.url) {
            socialLinksObj[link.platform.toLowerCase()] = link.url;
          }
        });
      }

      setAccountInfos({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        dateOfBirth: user.dateOfBirth ?? "",
        address: user.profile?.address ?? "",
        country: user.country ?? "",
        socialLinks: socialLinksObj ?? {},
        bio: user.profile?.bio ?? "",
      });
    }
  }, [user]);

  // Set initial tab from URL param or default to "account-infos"
  const [activeTab, setActiveTab] = useState(urlTab || "account-infos");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [orders, setOrders] = useState([]);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  // Update active tab when URL changes
  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [urlTab, activeTab]);

  // Handle tab change - update URL and state
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/account/${newTab}`, { replace: true });
  };

  const validateAccountInfo = () => {
    const newErrors = {};

    // Name validation
    if (!accountInfos.name.trim()) {
      newErrors.name = t("validation.nameRequired") || "Name is required";
    } else if (accountInfos.name.trim().length < 2) {
      newErrors.name =
        t("validation.nameMinLength") || "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!accountInfos.email.trim()) {
      newErrors.email = t("validation.emailRequired") || "Email is required";
    } else if (!emailRegex.test(accountInfos.email)) {
      newErrors.email =
        t("validation.emailInvalid") || "Please enter a valid email address";
    }

    // Phone validation (optional but must be valid if provided)
    if (accountInfos.phone.trim()) {
      const phoneRegex = /^[+]?([1-9][\d]{0,15})$/;
      if (!phoneRegex.test(accountInfos.phone.replace(/[\s\-()]/g, ""))) {
        newErrors.phone =
          t("validation.phoneInvalid") || "Please enter a valid phone number";
      }
    }

    // Date of birth validation (optional but must be valid if provided)
    if (accountInfos.dateOfBirth) {
      const birthDate = new Date(accountInfos.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (birthDate > today) {
        newErrors.dateOfBirth =
          t("validation.dobFuture") || "Date of birth cannot be in the future";
      } else if (age < 13) {
        newErrors.dateOfBirth =
          t("validation.dobMinAge") || "You must be at least 13 years old";
      } else if (age > 120) {
        newErrors.dateOfBirth =
          t("validation.dobMaxAge") || "Please enter a valid date of birth";
      }
    }

    // Bio validation (optional but has max length)
    if (accountInfos.bio && accountInfos.bio.length > 500) {
      newErrors.bio =
        t("validation.bioMaxLength") || "Bio must be less than 500 characters";
    }

    // Social links validation (optional but must be valid URLs if provided)
    const urlRegex = /^https?:\/\/.+/;
    Object.entries(accountInfos.socialLinks).forEach(([platform, url]) => {
      if (url && !urlRegex.test(url)) {
        newErrors[platform] = `Please enter a valid ${platform} URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChangeAccountInfos = (e) => {
    const { name, value } = e.target;

    setAccountInfos((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setHasChanges(true);
  };

  // Handle social link changes
  const handleSocialLinkChange = (platform, value) => {
    setAccountInfos((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));

    // Clear specific field error when user starts typing
    if (errors[platform]) {
      setErrors((prev) => ({
        ...prev,
        [platform]: "",
      }));
    }

    setHasChanges(true);
  };

  // Handle form submission
  const handleSubmitAccountInfos = async (e) => {
    e.preventDefault();

    if (!validateAccountInfo()) {
      toast.error(t("validation.formErrors") || "Please fix the errors below");
      return;
    }

    setIsLoading(true);

    try {
      // Convert socialLinks object back to array format for storage
      const socialLinksArray = Object.entries(accountInfos.socialLinks)
        .filter(([platform, url]) => url.trim() !== "")
        .map(([platform, url]) => ({
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          url: url.trim(),
        }));

      // Prepare data for update
      const updateData = {
        name: accountInfos.name.trim(),
        email: accountInfos.email.trim(),
        phone: accountInfos.phone.trim(),
        dateOfBirth: accountInfos.dateOfBirth,
        country: accountInfos.country.trim(),
        profile: {
          ...user.profile,
          bio: accountInfos.bio.trim(),
          address: accountInfos.address.trim(),
          socialLinks: socialLinksArray,
        },
      };

      // Update user data using the store function
      await updateUser(updateData);

      toast.success(
        t("account.updateSuccess") ||
          "Account information updated successfully!"
      );
      setHasChanges(false);
    } catch (error) {
      console.error("Error updating account:", error);

      // Handle specific error types
      if (error.response?.status === 409) {
        toast.error(t("errors.emailExists") || "This email is already taken");
        setErrors({
          email: t("errors.emailExists") || "This email is already taken",
        });
      } else if (error.response?.status === 400) {
        toast.error(t("errors.invalidData") || "Invalid data provided");
      } else {
        toast.error(
          t("errors.updateFailed") ||
            "Failed to update account information. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form reset
  const handleResetForm = () => {
    if (user) {
      // Convert array of social links to object format for easier handling
      const socialLinksObj = {
        instagram: "",
        tiktok: "",
        facebook: "",
        twitter: "",
        youtube: "",
      };

      // If user has socialLinks array, convert it to object format
      if (
        user.profile?.socialLinks &&
        Array.isArray(user.profile.socialLinks)
      ) {
        user.profile.socialLinks.forEach((link) => {
          if (link.platform && link.url) {
            socialLinksObj[link.platform.toLowerCase()] = link.url;
          }
        });
      }

      setAccountInfos({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        bio: user.profile?.bio || "",
        address: user.profile?.address || "",
        country: user.country || "",
        socialLinks: socialLinksObj,
      });
      setErrors({});
      setHasChanges(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (currentPassword === newPassword) {
        toast.error("New password must be different from the current password");
        return;
      }
      if (confirmPassword !== newPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }
      const user = await updateUser({ currentPassword, newPassword });
      if (!user) return;
      toast.success("Password updated successfully");
      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/account/security");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleGetOrders = useCallback(async () => {
    const orders = await getOrders();
    setOrders(orders);
  }, [getOrders]);

  useEffect(() => {
    if (activeTab === "orders") {
      handleGetOrders();
    }
  }, [activeTab, handleGetOrders]);

  const tabItems = [
    { value: "account-infos", label: `${t("account.info")}`, icon: User },
    { value: "security", label: "Login & Security", icon: Shield },
    { value: "orders", label: "Orders", icon: Package },
    { value: "store", label: "My Store", icon: Store },
    { value: "billing", label: "Billing", icon: CreditCard },
    { value: "ads", label: "Ads & Promotions", icon: Megaphone },
    { value: "saved", label: "Saved Items", icon: Heart },
    { value: "messages", label: "Messages", icon: MessageCircle },
    { value: "blogs", label: "My Blogs", icon: FileText },
    { value: "notifications", label: "Notifications", icon: Bell },
    { value: "documents", label: "Documents", icon: File },
    { value: "referrals", label: "Referrals", icon: Users },
    { value: "support", label: "Help & Support", icon: HelpCircle },
  ];

  const savedItems = [
    { name: "Wireless Headphones", price: "$199.99", image: "🎧" },
    { name: "Smart Watch", price: "$349.99", image: "⌚" },
    { name: "Laptop Stand", price: "$79.99", image: "💻" },
  ];

  const messages = [
    {
      from: "Support Team",
      subject: "Order Update",
      time: "2 hours ago",
      unread: true,
    },
    {
      from: "Store Manager",
      subject: "New Product Alert",
      time: "1 day ago",
      unread: false,
    },
    {
      from: "Billing Department",
      subject: "Payment Confirmation",
      time: "3 days ago",
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f2ed]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1f3b73] mb-2">
            Profile Settings
          </h1>
          <p className="text-[#1f3b73]/70">
            Manage your account preferences and settings
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="grid lg:grid-cols-5 gap-8">
          {/* Hamburger menu for sm/md screens */}
          <div className="lg:hidden mb-4">
            <button
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow border border-[#1f3b73]/10 text-[#1f3b73] w-full"
              onClick={() => setShowMenu((v) => !v)}
              aria-label="Open menu">
              <Menu size={22} />
              <span className="font-semibold">Menu</span>
            </button>
            {showMenu && (
              <div className="absolute left-0 overflow-scroll hide-scrollbar right-0 z-30 mt-2 bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 p-4">
                <TabsList className="flex flex-col gap-2">
                  {tabItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <TabsTrigger
                        key={item.value}
                        value={item.value}
                        asChild
                        onClick={() => setShowMenu(false)}
                        className="w-full justify-start gap-3 px-4 py-3 text-left data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-[#e1a95f]/20 transition-all duration-200 rounded-xl">
                        <Link
                          to={`/account/${item.value}`}
                          className="flex items-center gap-3 w-full">
                          <IconComponent size={18} />
                          <span>{item.label}</span>
                        </Link>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>
            )}
          </div>

          {/* Sidebar for large screens */}
          <div className="hidden lg:block lg:col-span-1">
            <TabsList className="flex lg:flex-col gap-2 bg-white p-6 rounded-2xl shadow-lg border border-[#1f3b73]/10 h-fit">
              {tabItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    asChild
                    className="w-full justify-start gap-3 px-4 py-3 text-left data-[state=active]:bg-[#1f3b73] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-[#e1a95f]/20 transition-all duration-200 rounded-xl">
                    <Link
                      to={`/account/${item.value}`}
                      className="flex items-center gap-3 w-full">
                      <IconComponent size={18} />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg border border-[#1f3b73]/10 overflow-hidden">
              <TabsContent value="account-infos" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Account Information
                  </h2>
                </div>
                <form onSubmit={handleSubmitAccountInfos} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#1f3b73] mb-2">
                        {t("account.fullName") || "Full Name"}
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={accountInfos.name}
                        onChange={handleChangeAccountInfos}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                          errors.name ? "border-red-500" : "border-[#1f3b73]/20"
                        }`}
                        placeholder={
                          t("account.enterFullName") || "Enter your full name"
                        }
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#1f3b73] mb-2">
                        {t("account.email") || "Email Address"}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={accountInfos.email}
                        onChange={handleChangeAccountInfos}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                          errors.email
                            ? "border-red-500"
                            : "border-[#1f3b73]/20"
                        }`}
                        placeholder={
                          t("account.enterEmail") || "Enter your email address"
                        }
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[#1f3b73] mb-2">
                        {t("account.phone") || "Phone Number"}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={accountInfos.phone}
                        onChange={handleChangeAccountInfos}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                          errors.phone
                            ? "border-red-500"
                            : "border-[#1f3b73]/20"
                        }`}
                        placeholder={
                          t("account.enterPhone") || "Enter your phone number"
                        }
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-[#1f3b73] mb-2">
                        {t("account.dateOfBirth") || "Date of Birth"}
                      </label>
                      <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formatDate(accountInfos.dateOfBirth)}
                        onChange={handleChangeAccountInfos}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                          errors.dateOfBirth
                            ? "border-red-500"
                            : "border-[#1f3b73]/20"
                        }`}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>

                    {/* Country Field */}
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-[#1f3b73] mb-2">
                        {"Country"}
                      </label>
                      <div className="relative">
                        <Globe
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1f3b73]/50"
                          size={18}
                        />
                        <select
                          id="country"
                          name="country"
                          value={accountInfos.country}
                          onChange={handleChangeAccountInfos}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent appearance-none bg-white ${
                            errors.country
                              ? "border-red-500"
                              : "border-[#1f3b73]/20"
                          }`}>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1f3b73]/50 pointer-events-none"
                          size={18}
                        />
                      </div>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* Address Field */}
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-[#1f3b73] mb-2">
                        {"Address"}
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-3 text-[#1f3b73]/50"
                          size={18}
                        />
                        <input
                          id="address"
                          type="text"
                          name="address"
                          value={accountInfos.address}
                          onChange={handleChangeAccountInfos}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                            errors.address
                              ? "border-red-500"
                              : "border-[#1f3b73]/20"
                          }`}
                          placeholder={"Enter your address"}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social Media Links Section */}
                  <div className="border-t border-[#1f3b73]/10 pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Share2 className="text-[#1f3b73]" size={20} />
                      <h3 className="text-xl font-semibold text-[#1f3b73]">
                        {"Social Media Links"}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Instagram */}
                      <div>
                        <label
                          htmlFor="instagram"
                          className="block text-sm font-medium text-[#1f3b73] mb-2">
                          Instagram
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-5 h-5 text-pink-500"
                              viewBox="0 0 24 24"
                              fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </div>
                          <input
                            id="instagram"
                            type="url"
                            name="instagram"
                            value={accountInfos.socialLinks.instagram}
                            onChange={(e) =>
                              handleSocialLinkChange(
                                "instagram",
                                e.target.value
                              )
                            }
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                              errors.instagram
                                ? "border-red-500"
                                : "border-[#1f3b73]/20"
                            }`}
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                        {errors.instagram && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.instagram}
                          </p>
                        )}
                      </div>

                      {/* TikTok */}
                      <div>
                        <label
                          htmlFor="tiktok"
                          className="block text-sm font-medium text-[#1f3b73] mb-2">
                          TikTok
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-5 h-5 text-black"
                              viewBox="0 0 24 24"
                              fill="currentColor">
                              <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 013.183-4.51v-3.5a6.329 6.329 0 00-5.394 10.692 6.33 6.33 0 1010.857-4.424V8.687a8.182 8.182 0 004.773 1.526V6.79a4.831 4.831 0 01-1.003-.104z" />
                            </svg>
                          </div>
                          <input
                            id="tiktok"
                            type="url"
                            name="tiktok"
                            value={accountInfos.socialLinks.tiktok}
                            onChange={(e) =>
                              handleSocialLinkChange("tiktok", e.target.value)
                            }
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                              errors.tiktok
                                ? "border-red-500"
                                : "border-[#1f3b73]/20"
                            }`}
                            placeholder="https://tiktok.com/@username"
                          />
                        </div>
                        {errors.tiktok && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.tiktok}
                          </p>
                        )}
                      </div>

                      {/* Facebook */}
                      <div>
                        <label
                          htmlFor="facebook"
                          className="block text-sm font-medium text-[#1f3b73] mb-2">
                          Facebook
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              viewBox="0 0 24 24"
                              fill="currentColor">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </div>
                          <input
                            id="facebook"
                            type="url"
                            name="facebook"
                            value={accountInfos.socialLinks.facebook}
                            onChange={(e) =>
                              handleSocialLinkChange("facebook", e.target.value)
                            }
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                              errors.facebook
                                ? "border-red-500"
                                : "border-[#1f3b73]/20"
                            }`}
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                        {errors.facebook && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.facebook}
                          </p>
                        )}
                      </div>

                      {/* X (Twitter) */}
                      <div>
                        <label
                          htmlFor="twitter"
                          className="block text-sm font-medium text-[#1f3b73] mb-2">
                          X (Twitter)
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-5 h-5 text-black"
                              viewBox="0 0 24 24"
                              fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </div>
                          <input
                            id="twitter"
                            type="url"
                            name="twitter"
                            value={accountInfos.socialLinks.twitter}
                            onChange={(e) =>
                              handleSocialLinkChange("twitter", e.target.value)
                            }
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                              errors.twitter
                                ? "border-red-500"
                                : "border-[#1f3b73]/20"
                            }`}
                            placeholder="https://x.com/username"
                          />
                        </div>
                        {errors.twitter && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.twitter}
                          </p>
                        )}
                      </div>

                      {/* YouTube */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="youtube"
                          className="block text-sm font-medium text-[#1f3b73] mb-2">
                          YouTube
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-5 h-5 text-red-600"
                              viewBox="0 0 24 24"
                              fill="currentColor">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </div>
                          <input
                            id="youtube"
                            type="url"
                            name="youtube"
                            value={accountInfos.socialLinks.youtube}
                            onChange={(e) =>
                              handleSocialLinkChange("youtube", e.target.value)
                            }
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent ${
                              errors.youtube
                                ? "border-red-500"
                                : "border-[#1f3b73]/20"
                            }`}
                            placeholder="https://youtube.com/@username"
                          />
                        </div>
                        {errors.youtube && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.youtube}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio Field */}
                  <div className="border-t border-[#1f3b73]/10 pt-6">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-[#1f3b73] mb-2">
                      {"Bio"}
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={accountInfos.bio}
                      onChange={handleChangeAccountInfos}
                      placeholder={
                        t("account.enterBio") || "Tell us about yourself..."
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent resize-none ${
                        errors.bio ? "border-red-500" : "border-[#1f3b73]/20"
                      }`}
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.bio ? (
                        <p className="text-red-500 text-sm">{errors.bio}</p>
                      ) : (
                        <div></div>
                      )}
                      <span className="text-sm text-[#1f3b73]/60">
                        {accountInfos.bio?.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={!hasChanges || isLoading}
                      className="px-6 py-3 bg-[#1f3b73] text-white rounded-xl hover:bg-[#1f3b73]/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Save size={18} />
                      )}
                      {isLoading
                        ? t("account.saving") || "Saving..."
                        : t("account.saveChanges") || "Save Changes"}
                    </button>

                    {hasChanges && (
                      <button
                        type="button"
                        onClick={handleResetForm}
                        disabled={isLoading}
                        className="px-6 py-3 border-2 border-[#1f3b73]/20 text-[#1f3b73] rounded-xl hover:bg-[#1f3b73]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {"Cancel"}
                      </button>
                    )}
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="security" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Login & Security
                  </h2>
                </div>
                <div className="space-y-6">
                  <form
                    onSubmit={(e) => handleUpdatePassword(e)}
                    className="bg-[#f4f2ed] p-6 rounded-xl">
                    <h3 className="font-semibold text-[#1f3b73] mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            className="w-full px-4 py-3 pr-12 border border-[#1f3b73]/20 rounded-xl focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1f3b73]/60 hover:text-[#1f3b73]">
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          id="newPassword"
                          autoComplete="new-password"
                          className="w-full px-4 py-3 border border-[#1f3b73]/20 rounded-xl focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          id="confirmPassword"
                          autoComplete="new-password"
                          className="w-full px-4 py-3 border border-[#1f3b73]/20 rounded-xl focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 px-6 py-3 bg-[#e1a95f] text-[#1f3b73] font-medium rounded-xl hover:bg-[#e1a95f]/90 transition-colors">
                      Update Password
                    </button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    My Orders
                  </h2>
                </div>
                <div className="space-y-4">
                  {orders?.map((order) => (
                    <div
                      key={order._id}
                      className="border border-[#1f3b73]/20 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-[#1f3b73] text-lg">
                            {order.product?.title?.slice(0, 20) || "No Title"}
                          </h3>
                          <p className="text-[#1f3b73]/70">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "responded"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                          {order.status || "Unknown"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[#1f3b73]/70">
                          #{order.product?.category}
                        </span>
                        <span className="font-bold text-[#1f3b73] text-lg">
                          {order.product?.price || 0} <strong>DZD</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="store" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <Store className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    My Store
                  </h2>
                </div>
                {user?.role === "supplier" && <UpdateCompanyInfos/>}
                {user?.role === "consumer" && (
                  <div className="text-center py-12">
                    <Store
                      className="mx-auto text-[#1f3b73]/30 mb-4"
                      size={64}
                    />
                    <h3 className="text-xl font-semibold text-[#1f3b73] mb-2">
                      No Store Yet
                    </h3>
                    <p className="text-[#1f3b73]/70 mb-6">
                      Start selling by creating your own store
                    </p>
                    <Link to="/create-store" className="inline-block w-fit">
                      <button className="px-6 py-3 bg-[#e1a95f] text-[#1f3b73] font-medium rounded-xl hover:bg-[#e1a95f]/90 transition-colors">
                        Create Store
                      </button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="billing" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Billing & Subscription
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#f4f2ed] p-6 rounded-xl">
                    <h3 className="font-semibold text-[#1f3b73] mb-4">
                      Current Plan
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-[#1f3b73]">
                        Free Plan
                      </span>
                      <span className="text-[#1f3b73]/70">$0/month</span>
                    </div>
                    <button className="w-full px-6 py-3 bg-[#1f3b73] text-white rounded-xl hover:bg-[#1f3b73]/90 transition-colors">
                      Upgrade Plan
                    </button>
                  </div>
                  <div className="bg-[#f4f2ed] p-6 rounded-xl">
                    <h3 className="font-semibold text-[#1f3b73] mb-4">
                      Payment Method
                    </h3>
                    <p className="text-[#1f3b73]/70 mb-4">
                      No payment method added
                    </p>
                    <button className="w-full px-6 py-3 border-2 border-[#1f3b73] text-[#1f3b73] rounded-xl hover:bg-[#1f3b73] hover:text-white transition-colors">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ads" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <Megaphone className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Ads & Promotions
                  </h2>
                </div>
                <div className="text-center py-12">
                  <Megaphone
                    className="mx-auto text-[#1f3b73]/30 mb-4"
                    size={64}
                  />
                  <h3 className="text-xl font-semibold text-[#1f3b73] mb-2">
                    No Active Promotions
                  </h3>
                  <p className="text-[#1f3b73]/70 mb-6">
                    Create your first ad campaign to boost your sales
                  </p>
                  <button className="px-6 py-3 bg-[#e1a95f] text-[#1f3b73] font-medium rounded-xl hover:bg-[#e1a95f]/90 transition-colors">
                    Create Campaign
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Saved Items
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedItems.map((item, index) => (
                    <div
                      key={index}
                      className="border border-[#1f3b73]/20 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-4 text-center">
                        {item.image}
                      </div>
                      <h3 className="font-semibold text-[#1f3b73] mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[#e1a95f] font-bold text-lg mb-4">
                        {item.price}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-[#1f3b73]/90 transition-colors">
                          Add to Cart
                        </button>
                        <button className="px-4 py-2 border border-[#1f3b73]/20 rounded-lg hover:bg-[#f4f2ed] transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="messages" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    My Messages
                  </h2>
                </div>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`border border-[#1f3b73]/20 rounded-xl p-6 hover:shadow-md transition-shadow ${
                        message.unread ? "bg-blue-50" : ""
                      }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[#1f3b73]">
                          {message.from}
                        </h3>
                        <span className="text-sm text-[#1f3b73]/70">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-[#1f3b73] mb-2">{message.subject}</p>
                      {message.unread && (
                        <span className="inline-block w-2 h-2 bg-[#e1a95f] rounded-full"></span>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="blogs" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    My Blogs
                  </h2>
                </div>
                <div className="text-center py-12">
                  <Edit3 className="mx-auto text-[#1f3b73]/30 mb-4" size={64} />
                  <h3 className="text-xl font-semibold text-[#1f3b73] mb-2">
                    No Blogs Yet
                  </h3>
                  <p className="text-[#1f3b73]/70 mb-6">
                    Share your thoughts and expertise with the community
                  </p>
                  <button className="px-6 py-3 bg-[#e1a95f] text-[#1f3b73] font-medium rounded-xl hover:bg-[#e1a95f]/90 transition-colors">
                    Write Your First Blog
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Notification Preferences
                  </h2>
                </div>
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-[#f4f2ed] rounded-xl">
                      <div>
                        <h3 className="font-semibold text-[#1f3b73] capitalize">
                          {key} Notifications
                        </h3>
                        <p className="text-[#1f3b73]/70 text-sm">
                          {key === "email" && "Receive notifications via email"}
                          {key === "sms" && "Receive notifications via SMS"}
                          {key === "push" && "Receive push notifications"}
                          {key === "marketing" &&
                            "Receive marketing and promotional emails"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            [key]: !value,
                          }))
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? "bg-[#1f3b73]" : "bg-gray-300"
                        }`}>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <File className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Verification Documents
                  </h2>
                </div>
                <div className="text-center py-12">
                  <Upload
                    className="mx-auto text-[#1f3b73]/30 mb-4"
                    size={64}
                  />
                  <h3 className="text-xl font-semibold text-[#1f3b73] mb-2">
                    No Documents Uploaded
                  </h3>
                  <p className="text-[#1f3b73]/70 mb-6">
                    Upload your verification documents to unlock additional
                    features
                  </p>
                  <button className="px-6 py-3 bg-[#e1a95f] text-[#1f3b73] font-medium rounded-xl hover:bg-[#e1a95f]/90 transition-colors">
                    Upload Documents
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="referrals" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Referrals
                  </h2>
                </div>
                <div className="bg-[#f4f2ed] p-6 rounded-xl mb-6">
                  <h3 className="font-semibold text-[#1f3b73] mb-4">
                    Your Referral Code
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <code className="bg-white px-4 py-2 rounded-lg border border-[#1f3b73]/20 font-mono text-[#1f3b73] text-lg">
                      REF-JD2024
                    </code>
                    <button className="px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-[#1f3b73]/90 transition-colors">
                      Copy
                    </button>
                  </div>
                  <p className="text-[#1f3b73]/70">
                    Share this code with friends to earn rewards!
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border border-[#1f3b73]/20 rounded-xl">
                    <div className="text-3xl font-bold text-[#1f3b73] mb-2">
                      0
                    </div>
                    <div className="text-[#1f3b73]/70">Total Referrals</div>
                  </div>
                  <div className="text-center p-6 border border-[#1f3b73]/20 rounded-xl">
                    <div className="text-3xl font-bold text-[#e1a95f] mb-2">
                      $0
                    </div>
                    <div className="text-[#1f3b73]/70">Earnings</div>
                  </div>
                  <div className="text-center p-6 border border-[#1f3b73]/20 rounded-xl">
                    <div className="text-3xl font-bold text-[#1f3b73] mb-2">
                      0
                    </div>
                    <div className="text-[#1f3b73]/70">Pending</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="p-8 m-0">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="text-[#1f3b73]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1f3b73]">
                    Help & Support
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#f4f2ed] p-6 rounded-xl">
                    <h3 className="font-semibold text-[#1f3b73] mb-4">
                      Contact Support
                    </h3>
                    <p className="text-[#1f3b73]/70 mb-4">
                      Get help from our support team
                    </p>
                    <button className="w-full px-6 py-3 bg-[#1f3b73] text-white rounded-xl hover:bg-[#1f3b73]/90 transition-colors">
                      Create Support Ticket
                    </button>
                  </div>
                  <div className="bg-[#f4f2ed] p-6 rounded-xl">
                    <h3 className="font-semibold text-[#1f3b73] mb-4">FAQ</h3>
                    <p className="text-[#1f3b73]/70 mb-4">
                      Find answers to common questions
                    </p>
                    <button className="w-full px-6 py-3 border-2 border-[#1f3b73] text-[#1f3b73] rounded-xl hover:bg-[#1f3b73] hover:text-white transition-colors">
                      Browse FAQ
                    </button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
