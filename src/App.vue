<template>
  <div class="app">
    <va-navbar color="primary">
      <template #left>
        <va-navbar-item>Sigorta Başvuru Formu</va-navbar-item>
      </template>
    </va-navbar>

    <main class="main-content">
      <div class="stepper mb-8">
        <va-progress-bar
          :model-value="(currentStep / totalSteps) * 100"
          color="primary"
        />
        <div class="step-labels mt-2">
          <span
            v-for="step in totalSteps"
            :key="step"
            :class="{ 'active': step === currentStep }"
            class="step-label"
          >
            Adım {{ step }}
          </span>
        </div>
      </div>

      <component :is="currentComponent" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFormStore } from './store/formStore';
import CampaignStep  from './components/CampaignStep.vue';
import PersonalInfoStep from './components/PersonalInfoStep.vue';
import ProductSelectionStep from './components/ProductSelectionStep.vue';
import PaymentStep from './components/PaymentStep.vue';

const store = useFormStore();

const totalSteps = 4;
const currentStep = computed(() => store.currentStep);

const currentComponent = computed(() => {
  switch (store.currentStep) {
    case 1:
      return CampaignStep;
    case 2:
      return PersonalInfoStep;
    case 3:
      return ProductSelectionStep;
    case 4:
      return PaymentStep;
    default:
      return CampaignStep;
  }
});
</script>

<style>
.app {
  min-height: 100vh;
  background-color: #f8fafc;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.stepper {
  max-width: 600px;
  margin: 0 auto;
}

.step-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.step-label {
  font-size: 0.875rem;
  color: #64748b;
}

.step-label.active {
  color: var(--va-primary);
  font-weight: bold;
}
</style>