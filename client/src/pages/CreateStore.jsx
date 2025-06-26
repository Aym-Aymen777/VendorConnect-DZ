import React, { useState } from "react";
import {
  Phone,
  Shield,
  Upload,
  CheckCircle,
  FileText,
  Building2,
  User,
  Loader,
} from "lucide-react";
import { toast } from "sonner";
import axios from "../api/axios";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { Link } from "react-router-dom";

const CreateStore = () => {
  const { user } = useAuthCheck();
  const [currentStep, setCurrentStep] = useState(4);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    countryCode: "+213",
    otp: "",
    documents: {
      identity: null,
      businessLicense: null,
      portfolio: null,
    },
  });

  const sendOtpCode = async () => {
    try {
      const phoneNumber = formData.countryCode + formData.phoneNumber;
      const res = await axios.post("/api/v1/send-otp", { phoneNumber });

      if (res.status === 200) {
        toast.success("OTP sent successfully!");
        setCurrentStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const verifyOtpCode = async () => {
    try {
      const phoneNumber = formData.countryCode + formData.phoneNumber;
      console.log("Phone number:", phoneNumber);
      console.log("OTP:", formData.otp);
      console.log("User ID:", user._id);
      const res = await axios.post("/api/v1/verify-otp", {
        phoneNumber,
        otp: formData.otp,
        userID: user._id,
      });

      if (res.status === 200) {
        toast.success("OTP verified!");
        setCurrentStep(3);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  // Comprehensive list of countries with their codes
  const countryCodes = [
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+212", country: "Morocco", flag: "🇲🇦" },
    { code: "+216", country: "Tunisia", flag: "🇹🇳" },
    { code: "+218", country: "Libya", flag: "🇱🇾" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+90", country: "Turkey", flag: "🇹🇷" },
    { code: "+98", country: "Iran", flag: "🇮🇷" },
    { code: "+92", country: "Pakistan", flag: "🇵🇰" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
    { code: "+84", country: "Vietnam", flag: "🇻🇳" },
    { code: "+63", country: "Philippines", flag: "🇵🇭" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
  ];

  const handleFileUpload = (docType, file) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file,
      },
    }));
  };

  const handleDocumentsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { identity, businessLicense, portfolio } = formData.documents;

    if (!identity || !businessLicense || !portfolio) {
      return toast.error("Please upload all documents before submitting.");
    }

    try {
      // Helper to convert File to base64
      const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const identityBase64 = await fileToBase64(identity);
      const businessBase64 = await fileToBase64(businessLicense);
      const portfolioBase64 = await fileToBase64(portfolio);

      const payload = {
        supplierProfile: {
          phone: formData.phoneNumber,
          documents: {
            identityDocumentUrl: identityBase64,
            businessLicenseUrl: businessBase64,
            resumeOrPortfolioUrl: portfolioBase64,
          },
        },
      };

      const res = await axios.post("/api/v1/user/documents", payload);

      if (res.status === 200) {
        toast.success("Documents submitted successfully.");
        setLoading(false);
        setCurrentStep(4);
      } else {
        toast.error("Error submitting documents: " + res.data.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error("Document submission failed:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              currentStep >= step ? "text-white" : "text-gray-600"
            }`}
            style={{
              backgroundColor: currentStep >= step ? "#1f3b73" : "#d1d5db",
            }}>
            {step}
          </div>
          {step < 4 && (
            <div
              className={`w-16 h-1`}
              style={{
                backgroundColor: currentStep > step ? "#1f3b73" : "#d1d5db",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderPhoneVerification = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Phone
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: "#e1a95f" }}
        />
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1f3b73" }}>
          Verify Phone Number
        </h2>
        <p className="text-gray-600">Enter your phone number to get started</p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#1f3b73" }}>
            Country Code
          </label>
          <select
            value={formData.countryCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, countryCode: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            style={{
              "--tw-ring-color": "#e1a95f",
            }}>
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code} {country.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#1f3b73" }}>
            Phone Number
          </label>
          <div className="flex">
            <span
              className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 text-gray-500"
              style={{ backgroundColor: "#f4f2ed" }}>
              {formData.countryCode}
            </span>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              placeholder="Enter phone number"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:border-transparent"
              style={{
                "--tw-ring-color": "#e1a95f",
              }}
              required
            />
          </div>
        </div>

        <button
          type="button"
          onClick={sendOtpCode}
          className="w-full text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors font-medium"
          style={{ backgroundColor: "#e1a95f" }}>
          Send Verification Code
        </button>
      </div>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Shield
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: "#e1a95f" }}
        />
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1f3b73" }}>
          Enter Verification Code
        </h2>
        <p className="text-gray-600">
          We sent a 6-digit code to {formData.countryCode}{" "}
          {formData.phoneNumber}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#1f3b73" }}>
            Verification Code
          </label>
          <input
            type="text"
            value={formData.otp}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, otp: e.target.value }))
            }
            placeholder="Enter 6-digit code"
            maxLength="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-center text-lg tracking-widest"
            style={{
              "--tw-ring-color": "#e1a95f",
            }}
            required
          />
        </div>

        <button
          type="button"
          onClick={verifyOtpCode}
          className="w-full text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors font-medium"
          style={{ backgroundColor: "#1f3b73" }}>
          Verify Code
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="w-full py-2 px-4 rounded-lg hover:opacity-80 transition-colors font-medium"
          style={{ color: "#e1a95f", backgroundColor: "transparent" }}>
          Change Phone Number
        </button>
      </div>
    </div>
  );

  const FileUploadSection = ({ title, docType, description, file }) => (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-opacity-60 transition-colors"
      style={{ "--hover-border-color": "#e1a95f" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#e1a95f")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}>
      <div className="text-center">
        <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <h3 className="font-medium mb-1" style={{ color: "#1f3b73" }}>
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>

        {file ? (
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: "#f4f2ed", border: "1px solid #e1a95f" }}>
            <CheckCircle
              className="w-5 h-5 inline mr-2"
              style={{ color: "#1f3b73" }}
            />
            <span className="font-medium" style={{ color: "#1f3b73" }}>
              {file.name}
            </span>
          </div>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(docType, e.target.files[0])}
              className="hidden"
            />
            <span
              className="inline-flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: "#e1a95f" }}>
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </span>
          </label>
        )}
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Upload
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: "#e1a95f" }}
        />
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1f3b73" }}>
          Upload Required Documents
        </h2>
        <p className="text-gray-600">
          Please upload all required documents to complete your store
          registration
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <FileUploadSection
            title="Identity Document"
            docType="identity"
            icon={User}
            description="Upload your ID card, passport, or driver's license"
            file={formData.documents.identity}
          />

          <FileUploadSection
            title="Business License"
            docType="businessLicense"
            description="Upload your business registration or license"
            file={formData.documents.businessLicense}
          />

          <FileUploadSection
            title="Resume/Portfolio"
            docType="portfolio"
            icon={FileText}
            description="Upload your resume or portfolio document"
            file={formData.documents.portfolio}
          />
        </div>

        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: "#f4f2ed", border: "1px solid #e1a95f" }}>
          <h4 className="font-medium mb-2" style={{ color: "#1f3b73" }}>
            Document Requirements:
          </h4>
          <ul
            className="text-sm space-y-1"
            style={{ color: "#1f3b73", opacity: 0.8 }}>
            <li>• All documents must be clear and readable</li>
            <li>• Accepted formats: PDF, JPG, JPEG, PNG</li>
            <li>• Maximum file size: 10MB per document</li>
            <li>• Documents should be recent and valid</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex-1 text-gray-800 py-2 px-4 rounded-lg hover:opacity-80 transition-colors font-medium"
            style={{ backgroundColor: "#f4f2ed", border: "1px solid #e1a95f" }}>
            Back
          </button>
          <button
            type="button"
            onClick={handleDocumentsSubmit}
            disabled={
              !formData.documents.identity ||
              !formData.documents.businessLicense ||
              !formData.documents.portfolio
            }
            className="flex-1 text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            style={{ backgroundColor: "#1f3b73" }}>
            {!loading && "Submit Documents"}{" "}
            {loading && <Loader className="w-4 h-4 loading" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderThankYou = () => (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <CheckCircle
          className="w-20 h-20 mx-auto mb-6"
          style={{ color: "#e1a95f" }}
        />
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#1f3b73" }}>
          Thank You!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your store application has been submitted successfully.
        </p>
      </div>

      <div
        className="rounded-lg p-6 mb-6"
        style={{ backgroundColor: "#f4f2ed", border: "1px solid #e1a95f" }}>
        <h3 className="font-semibold mb-2" style={{ color: "#1f3b73" }}>
          What happens next?
        </h3>
        <ul
          className="text-sm space-y-2 text-left"
          style={{ color: "#1f3b73", opacity: 0.8 }}>
          <li>• Our admin team will review your application</li>
          <li>• You'll receive an email confirmation shortly</li>
          <li>• Review process typically takes 2-3 business days</li>
          <li>• We'll notify you once your store is approved</li>
        </ul>
      </div>

      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: "#f4f2ed", border: "1px solid #1f3b73" }}>
        <p className="text-sm" style={{ color: "#1f3b73" }}>
          <strong>Application ID:</strong> ST-{Date.now().toString().slice(-6)}
        </p>
        <p className="text-xs mt-1" style={{ color: "#1f3b73", opacity: 0.7 }}>
          Save this ID for future reference
        </p>
      </div>

      <Link to="/" className="flex justify-center mt-8">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="text-gray-800 py-2 px-4 rounded-lg hover:opacity-80 transition-colors font-medium"
          style={{ backgroundColor: "#f4f2ed", border: "1px solid #e1a95f" }}>
          Back to Home
        </button>
      </Link>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4"
      style={{ backgroundColor: "#f4f2ed" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#1f3b73" }}>
            Create Your Store
          </h1>
          <p className="text-xl" style={{ color: "#1f3b73", opacity: 0.8 }}>
            Join our marketplace in just a few simple steps
          </p>
        </div>

        {renderStepIndicator()}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && renderPhoneVerification()}
          {currentStep === 2 && renderOtpVerification()}
          {currentStep === 3 && renderDocumentUpload()}
          {currentStep === 4 && renderThankYou()}
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
