<template>
    <div class="campaign-step">
      <va-card class="mb-4">
        <va-card-title>Kampanya Kodu Girişi</va-card-title>
        <va-card-content>
          <form @submit.prevent="handleSubmit">
            <va-input
              v-model="campaignCode"
              label="Kampanya Kodu"
              placeholder="Kampanya kodunu giriniz"
              class="mb-4"
            />
            
            <div class="consent-section mb-4">
              <va-checkbox
                v-model="consentChecked"
                class="mb-2"
              >
                Aydınlatma metnini okudum ve kabul ediyorum
                <va-button
                  text
                  color="primary"
                  @click="showConsentModal = true"
                >
                  (Detaylar)
                </va-button>
              </va-checkbox>
  
              <va-checkbox
                v-model="privacyChecked"
                class="mb-2"
              >
                Kişisel verilerimin işlenmesine rıza gösteriyorum
                <va-button
                  text
                  color="primary"
                  @click="showPrivacyModal = true"
                >
                  (Detaylar)
                </va-button>
              </va-checkbox>
            </div>
  
            <va-button
              type="submit"
              :disabled="!isValid"
              block
            >
              Devam Et
            </va-button>
          </form>
        </va-card-content>
      </va-card>
  
      <!-- Consent Modal -->
      <va-modal
        v-model="showConsentModal"
        title="Aydınlatma Metni"
        hide-default-actions
      >
        <div class="pa-4">
          <p>Aydınlatma metni içeriği buraya gelecek...</p>
          <va-button
            class="mt-4"
            block
            @click="showConsentModal = false"
          >
            Kapat
          </va-button>
        </div>
      </va-modal>
  
      <!-- Privacy Modal -->
      <va-modal
        v-model="showPrivacyModal"
        title="Kişisel Verilerin İşlenmesi"
        hide-default-actions
      >
        <div class="pa-4">
          <p>Kişisel verilerin işlenmesi hakkında detaylı bilgi...</p>
          <va-button
            class="mt-4"
            block
            @click="showPrivacyModal = false"
          >
            Kapat
          </va-button>
        </div>
      </va-modal>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useFormStore } from '../store/formStore';
  
  const store = useFormStore();
  const campaignCode = ref('');
  const consentChecked = ref(false);
  const privacyChecked = ref(false);
  const showConsentModal = ref(false);
  const showPrivacyModal = ref(false);
  
  const isValid = computed(() => {
    return campaignCode.value && consentChecked.value && privacyChecked.value;
  });
  
  const handleSubmit = () => {
    if (isValid.value) {
      store.setCampaignCode(campaignCode.value);
      store.setConsentChecked(consentChecked.value);
      store.setPrivacyChecked(privacyChecked.value);
      store.nextStep();
    }
  };
  </script>
  
  <style scoped>
  .campaign-step {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>