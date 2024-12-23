<template>
    <div class="product-selection">
      <h2 class="text-2xl mb-6">Sigorta Ürünleri</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <va-card
          v-for="product in products"
          :key="product.id"
          :class="{ 'selected': selectedProduct === product.id }"
          class="product-card"
          @click="selectProduct(product.id)"
        >
          <va-card-title>{{ product.name }}</va-card-title>
          <va-card-content>
            <p class="mb-4">{{ product.description }}</p>
            <p class="text-xl font-bold">{{ product.price }} TL</p>
            <ul class="mt-4">
              <li v-for="feature in product.features" :key="feature" class="mb-2">
                ✓ {{ feature }}
              </li>
            </ul>
          </va-card-content>
        </va-card>
      </div>
  
      <div class="button-group mt-8">
        <va-button
          color="secondary"
          class="mr-4"
          @click="store.previousStep"
        >
          Geri
        </va-button>
        <va-button
          :disabled="!selectedProduct"
          @click="handleContinue"
        >
          Devam Et
        </va-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useFormStore } from '../store/formStore';
  
  const store = useFormStore();
  const selectedProduct = ref(null);
  
  const products = [
    {
      id: '1',
      name: 'Temel Sağlık Sigortası',
      description: 'Temel sağlık güvencesi için ideal paket',
      price: '299',
      features: [
        'Yıllık check-up',
        'Acil servis hizmetleri',
        'Ayakta tedavi',
        'İlaç masrafları'
      ]
    },
    {
      id: '2',
      name: 'Aile Sağlık Paketi',
      description: 'Tüm aile için kapsamlı sağlık güvencesi',
      price: '599',
      features: [
        'Aile check-up paketi',
        'Doğum masrafları',
        'Çocuk aşıları',
        'Diş tedavileri'
      ]
    },
    {
      id: '3',
      name: 'Premium Sağlık Sigortası',
      description: 'En kapsamlı sağlık güvencesi',
      price: '899',
      features: [
        'Özel hastane ağı',
        'Yurtdışı tedavi',
        'Alternatif tıp',
        'VIP hizmetler'
      ]
    }
  ];
  
  const selectProduct = (productId: string) => {
    selectedProduct.value = productId;
  };
  
  const handleContinue = () => {
    if (selectedProduct.value) {
      store.setSelectedProduct(selectedProduct.value);
      store.nextStep();
    }
  };
  </script>
  
  <style scoped>
  .product-selection {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .product-card {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .product-card.selected {
    border: 2px solid var(--va-primary);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  </style>