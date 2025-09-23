export interface PartnerRegistration {
  name: string;
  businessName: string;
  phone: string;
  profileImage?: string;
  isVerified?: boolean;
  status?: string;
  latitude?: number;
  longitude?: number;
  heading?: number;
  speed?: number;
  panCardId?: string;
  aadharFrontId?: string;
  aadharBackId?: string;
  selfieId?: string;
  bankPassbookId?: string;
  bankAccountNumber?: string;
  bankIFSC?: string;
  bankName?: string;
  accountHolderName?: string;
  kycStatus?: string;
  drivingLicenseId?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  experienceYears?: number;
  languagesSpoken?: string[];
  userId?: string;
}