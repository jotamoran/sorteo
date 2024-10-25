<template>
    <v-container class="admin-container" fluid>
      <h1 class="text-center">Administración de Boletos</h1>
  
      <div class="d-flex justify-content-between mb-3">
        <div>
          <v-btn color="primary" @click="refrescarDatos">Refrescar</v-btn>
        </div>
        <div class="text-end">
          <strong>Total Vendido: </strong> ${{ totalVendido.toFixed(2) }}
        </div>
      </div>
  
      <v-data-table
        :headers="headers"
        :items="boletos"
        item-key="numero"
        class="elevation-1"
        :items-per-page="5"
      >
        <template v-slot:default="{ items }">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.numero" :class="item.status === 'comprado' ? 'comprado' : 'disponible'">
              <td>{{ item.numero }}</td>
              <td>${{ item.valor.toFixed(2) }}</td> <!-- Formato de moneda -->
              <td>{{ item.nombre_del_comprador }}</td>
              <td>{{ item.telefono }}</td>
              <td>{{ item.correo }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const boletos = ref([]);
      const totalVendido = ref(0);
      const headers = [
        { text: 'Número', value: 'numero' },
        { text: 'Valor', value: 'valor' },
        { text: 'Nombre del Comprador', value: 'nombre_del_comprador' },
        { text: 'Teléfono', value: 'telefono' },
        { text: 'Correo', value: 'correo' },
        { text: 'Estado', value: 'status' },
      ];
  
      const calcularTotalVendido = () => {
        totalVendido.value = boletos.value
          .filter(boleto => boleto.status === 'comprado')
          .reduce((acc, boleto) => acc + boleto.valor, 0);
      };
  
      const refrescarDatos = async () => {
        const url = import.meta.env.VITE_API_SORTEO + 'boletos';
        try {
            
          const response = await fetch(url);
          if (!response.ok) throw new Error('Error al cargar los boletos');
          boletos.value = await response.json();
          calcularTotalVendido();
        } catch (error) {
          console.error('Error cargando los boletos:', error);
        }
      };
  
      onMounted(() => {
        const nombre = localStorage.getItem('nombre');
        if (!nombre) {
          // Redireccionar a la ruta de inicio si no existe el nombre
          router.push({ path: '/main' });
          return;
        }
        refrescarDatos();
      });
  
      return {
        boletos,
        totalVendido,
        headers,
        refrescarDatos,
      };
    },
  };
  </script>
  
  <style scoped>
  .admin-container {
    padding: 20px;
  }
  
  .comprado {
    background-color: #ffccbc; /* Color para boletos comprados */
  }
  
  .disponible {
    background-color: #e0f7fa; /* Color para boletos disponibles */
  }
  </style>
  