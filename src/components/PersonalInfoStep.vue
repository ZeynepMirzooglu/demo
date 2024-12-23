<template>
    <div class="personal-info-step">
      <va-card class="mb-4">
        <va-card-title>Kişisel Bilgiler</va-card-title>
        <va-card-content>
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-2 gap-4">
              <va-input
                v-model="personalInfo.name"
                label="Ad"
                :rules="{ required: true }"
              />
              <va-input
                v-model="personalInfo.surname"
                label="Soyad"
                :rules="{ required: true }"
              />
            </div>
  
            <va-input
              v-model="personalInfo.email"
              label="E-posta"
              type="email"
              :rules="{ required: true, email: true }"
              class="mt-4"
            />
  
            <va-input
              v-model="personalInfo.phone"
              label="Telefon"
              :rules="{ required: true }"
              class="mt-4"
            />
  
            <va-date-input
              v-model="personalInfo.birthDate"
              label="Doğum Tarihi"
              :rules="{ required: true }"
              class="mt-4"
            />
  
            <!-- Family Members Section -->
            <div class="family-members mt-6">
              <h3 class="mb-4">Aile Üyeleri (İsteğe Bağlı)</h3>
              
              <div v-for="(member, index) in familyMembers" :key="index" class="family-member mb-4">
                <div class="grid grid-cols-2 gap-4">
                  <va-input
                    v-model="member.name"
                    label="Ad"
                  />
                  <va-input
                    v-model="member.surname"
                    label="Soyad"
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-2">
                  <va-date-input
                    v-model="member.birthDate"
                    label="Doğum Tarihi"
                  />
                  <va-select
                    v-model="member.relationship"
                    label="Yakınlık"
                    :options="['spouse', 'child']"
                  />
                </div>
  
                <va-button
                  small
                  color="danger"
                  class="mt-2"
                  @click="removeFamilyMember(index)"
                >
                  Üyeyi Kaldır
                </va-button>
              </div>
  
              <va-button
                small
                color="success"
                class="mt-4"
                @click="addFamilyMember"
              >
                Aile Üyesi Ekle
              </va-button>
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
                Devam Et
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
  const personalInfo = ref({
    name: '',
    surname: '',
    email: '',
    phone: '',
    birthDate: '',
  });
  
  const familyMembers = ref([]);
  
  const isValid = computed(() => {
    return (
      personalInfo.value.name &&
      personalInfo.value.surname &&
      personalInfo.value.email &&
      personalInfo.value.phone &&
      personalInfo.value.birthDate
    );
  });
  
  const addFamilyMember = () => {
    familyMembers.value.push({
      name: '',
      surname: '',
      birthDate: '',
      relationship: 'child',
    });
  };
  
  const removeFamilyMember = (index: number) => {
    familyMembers.value.splice(index, 1);
  };
  
  const handleSubmit = () => {
    if (isValid.value) {
      store.setPersonalInfo(personalInfo.value);
      store.familyMembers = familyMembers.value;
      store.nextStep();
    }
  };
  </script>
  
  <style scoped>
  .personal-info-step {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .family-member {
    border: 1px solid #eee;
    padding: 1rem;
    border-radius: 8px;
  }
  </style>