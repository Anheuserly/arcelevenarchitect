
// src/app/partners/PartnerRegistrationPage.tsx
"use client";

import React, { useState } from "react";
import { databases, storage } from "../../../lib/appwrite";
import { ID } from "appwrite";
import type { PartnerRegistration } from "../../types/partner";
import {
  validatePhone,
  validateIFSC,
  validateAccountNumber,
  validateRequired,
} from "../../utils/validation";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const PARTNERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PARTNERS_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_PARTNERS_DOCS__BUCKET_ID!;

/* ---------- Small reusable form components ---------- */

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  error,
  placeholder,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
}: FormSelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface FileUploadProps {
  label: string;
  onFileChange: (file: File) => void;
  required?: boolean;
  error?: string;
}

function FileUpload({ label, onFileChange, required = false, error }: FileUploadProps) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="flex items-center">
        <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <span className="mt-1 text-sm">Upload File</span>
          <input type="file" className="hidden" onChange={handleFileChange} required={required} />
        </label>
        {fileName && <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">{fileName}</span>}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

/* ---------- Main Partner Registration component ---------- */

export default function PartnerRegistrationPage() {
  const [formData, setFormData] = useState<PartnerRegistration>({
    name: "",
    businessName: "",
    phone: "",
    vehicleType: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    accountHolderName: "",
    kycStatus: "pending",
    vehicleNumber: "",
    experienceYears: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  const vehicleTypes = [
    { value: "bike", label: "Bike" },
    { value: "car", label: "Car" },
    { value: "van", label: "Van" },
    { value: "truck", label: "Truck" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFileUpload = (fieldName: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.name)) newErrors.name = "Name is required";
    if (!validateRequired(formData.businessName)) newErrors.businessName = "Business name is required";
    if (!validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number";
    if (!validateRequired(formData.vehicleType)) newErrors.vehicleType = "Vehicle type is required";

    if (formData.bankAccountNumber && !validateAccountNumber(formData.bankAccountNumber)) {
      newErrors.bankAccountNumber = "Please enter a valid account number";
    }
    if (formData.bankIFSC && !validateIFSC(formData.bankIFSC)) {
      newErrors.bankIFSC = "Please enter a valid IFSC code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (file: File, fieldName: string): Promise<string> => {
    try {
      const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
      return response.$id;
    } catch (err) {
      console.error(`Error uploading ${fieldName}:`, err);
      throw new Error(`Failed to upload ${fieldName}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const fileUploads: Record<string, string> = {};

      // Upload files sequentially (could be parallel if desired)
      for (const [fieldName, file] of Object.entries(uploadedFiles)) {
        try {
          const fileId = await uploadFile(file, fieldName);
          fileUploads[fieldName] = fileId;
        } catch (err) {
          console.error(`Failed to upload ${fieldName}`, err);
          setErrors((prev) => ({ ...prev, [fieldName]: `Failed to upload ${fieldName}. Please try again.` }));
          setIsSubmitting(false);
          return;
        }
      }

      const partnerData = {
        ...formData,
        ...fileUploads,
        status: "pending",
        isVerified: false,
        kycStatus: "pending",
        kycSubmittedAt: new Date().toISOString(),
        totalEarnings: 0,
        totalVisits: 0,
        completedServiceIds: [],
        ratings: 0,
        reviews: [],
        createdAt: new Date().toISOString(),
      };

      await databases.createDocument(DATABASE_ID, PARTNERS_COLLECTION_ID, ID.unique(), partnerData);

      setSubmissionSuccess(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrors({ submit: "Failed to submit the form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in becoming our partner. We'll review your application and get back to you soon.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Partner Registration</h1>
          <p className="mt-4 text-gray-600">Join our network of service partners and grow your business with us.</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  error={errors.name}
                  placeholder="Enter your full name"
                />
                <FormInput
                  label="Business Name"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  error={errors.businessName}
                  placeholder="Enter your business name"
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  error={errors.phone}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicle Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  label="Vehicle Type"
                  name="vehicleType"
                  value={formData.vehicleType || ""}
                  onChange={handleInputChange}
                  options={vehicleTypes}
                  required
                  error={errors.vehicleType}
                />
                <FormInput
                  label="Vehicle Number"
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber || ""}
                  onChange={handleInputChange}
                  placeholder="Enter vehicle registration number"
                />
                <FormInput
                  label="Years of Experience"
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears?.toString() || ""}
                  onChange={handleInputChange}
                  placeholder="Enter years of experience"
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload
                  label="PAN Card"
                  onFileChange={(file) => handleFileUpload("panCardId", file)}
                  required
                  error={errors.panCardId}
                />
                <FileUpload
                  label="Aadhar Front"
                  onFileChange={(file) => handleFileUpload("aadharFrontId", file)}
                  required
                  error={errors.aadharFrontId}
                />
                <FileUpload
                  label="Aadhar Back"
                  onFileChange={(file) => handleFileUpload("aadharBackId", file)}
                  required
                  error={errors.aadharBackId}
                />
                <FileUpload
                  label="Driving License"
                  onFileChange={(file) => handleFileUpload("drivingLicenseId", file)}
                  required
                  error={errors.drivingLicenseId}
                />
                <FileUpload
                  label="Profile Photo"
                  onFileChange={(file) => handleFileUpload("profileImage", file)}
                  required
                  error={errors.profileImage}
                />
                <FileUpload
                  label="Bank Passbook"
                  onFileChange={(file) => handleFileUpload("bankPassbookId", file)}
                  required
                  error={errors.bankPassbookId}
                />
              </div>
            </div>

            {/* Bank Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Bank Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  label="Account Holder Name"
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName || ""}
                  onChange={handleInputChange}
                  placeholder="Enter account holder name"
                />
                <FormInput
                  label="Bank Name"
                  type="text"
                  name="bankName"
                  value={formData.bankName || ""}
                  onChange={handleInputChange}
                  placeholder="Enter bank name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Account Number"
                    type="text"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber || ""}
                    onChange={handleInputChange}
                    error={errors.bankAccountNumber}
                    placeholder="Enter account number"
                  />
                  <FormInput
                    label="IFSC Code"
                    type="text"
                    name="bankIFSC"
                    value={formData.bankIFSC || ""}
                    onChange={handleInputChange}
                    error={errors.bankIFSC}
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              {errors.submit && <p className="mt-2 text-sm text-red-600 text-center">{errors.submit}</p>}
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By submitting this form, you agree to our Terms of Service and Privacy Policy.
            We'll contact you within 2-3 business days after reviewing your application.
          </p>
        </div>
      </div>
    </div>
  );
}
