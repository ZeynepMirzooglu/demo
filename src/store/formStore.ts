import { defineStore } from 'pinia';

interface PersonalInfo {
  name: string;
  surname: string;
  email: string;
  phone: string;
  birthDate: string;
}

interface FamilyMember {
  name: string;
  surname: string;
  birthDate: string;
  relationship: 'spouse' | 'child';
}

interface FormState {
  currentStep: number;
  campaignCode: string;
  consentChecked: boolean;
  privacyChecked: boolean;
  personalInfo: PersonalInfo;
  familyMembers: FamilyMember[];
  selectedProduct: string | null;
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolderName: string;
  };
}

export const useFormStore = defineStore('form', {
  state: (): FormState => ({
    currentStep: 1,
    campaignCode: '',
    consentChecked: false,
    privacyChecked: false,
    personalInfo: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      birthDate: '',
    },
    familyMembers: [],
    selectedProduct: null,
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: '',
    },
  }),

  actions: {
    nextStep() {
      this.currentStep++;
    },
    previousStep() {
      this.currentStep--;
    },
    setConsentChecked(value: boolean) {
      this.consentChecked = value;
    },
    setPrivacyChecked(value: boolean) {
      this.privacyChecked = value;
    },
    setCampaignCode(code: string) {
      this.campaignCode = code;
    },
    setPersonalInfo(info: PersonalInfo) {
      this.personalInfo = info;
    },
    addFamilyMember(member: FamilyMember) {
      this.familyMembers.push(member);
    },
    removeFamilyMember(index: number) {
      this.familyMembers.splice(index, 1);
    },
    setSelectedProduct(productId: string) {
      this.selectedProduct = productId;
    },
    setPaymentInfo(info: FormState['paymentInfo']) {
      this.paymentInfo = info;
    },
  },
});