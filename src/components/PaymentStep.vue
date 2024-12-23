<template>
    <div class="payment-step">
      <va-card>
        <va-card-title>Ödeme Bilgileri</va-card-title>
        <va-card-content>
          <form @submit.prevent="handleSubmit">
            <va-input
              v-model="paymentInfo.cardHolderName"
              label="Kart Üzerindeki İsim"
              :rules="{ required: true }"
              class="mb-4"
            />
  
            <va-input
              v-model="paymentInfo.cardNumber"
              label="Kart Numarası"
              :rules="{ required: true, length: 16 }"
              class="mb-4"
            />
  
            <div class="grid grid-cols-2 gap-4">
              <va-input
                v-model="paymentInfo.expiryDate"
                label="Son Kullanma Tarihi (MM/YY)"
                :rules="{ required: true }"
              />
              <va-input
                v-model="paymentInfo.cvv"
                label="CVV"
                :rules="{ required: true, length: 3 }"
                type="password"
              />
            </div>
  
            <div class="button-group mt-6">
              <va-button
                type="button"
                color="secondary"
                class="mr-2"
                @click="store.previousStep"
              >
                Geri
              </va-button>
              <va-button
                type="submit"
                :disabled="!isValid"
              >
                Ödemeyi Tamamla
              </va-button>
            </div>
          </form>
        </va-card-content>
      </va-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useFormStore } from '../store/formStore';
  
  const store = useFormStore();
  const paymentInfo = ref({
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const isValid = computed(() => {
    return (
      paymentInfo.value.cardHolderName &&
      paymentInfo.value.cardNumber.length === 16 &&
      paymentInfo.value.expiryDate &&
      paymentInfo.value.cvv.length === 3
    );
  });
  
  const handleSubmit = () => {
    if (isValid.value) {
      store.setPaymentInfo(paymentInfo.value);
      // Here you would typically make an API call to process the payment
      console.log('Payment processed successfully');
    }
  };
  </script>
  
  <style scoped>
  .payment-step {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  </style>