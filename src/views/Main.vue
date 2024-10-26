<template>
    <v-container class="sorteo-container">
      <h1 class="text-center">
        Participa en el Sorteo 
        <v-btn @click="abrirModalPremio" color="primary" class="ml-3">
          Ver premio
        </v-btn>
      </h1>
  
      <v-row>
        <v-col v-for="boleto in boletos" :key="boleto.numero" cols="6" md="4" lg="3">
          <v-card 
            :class="boleto.status === 'comprado' ? 'comprado' : 'disponible'"
            @click="boleto.status === 'disponible' ? abrirModal(boleto) : null"
            :disabled="boleto.status === 'comprado'" 
          >
            <v-card-title class="text-center">
              Boleto {{ boleto.numero }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Modal para el premio -->
      <v-dialog v-model="modalPremioVisible" max-width="500px">
        <v-card>
          <v-card-title class="headline">Premio del Sorteo</v-card-title>
          <v-card-text>
            <v-img :src="premioImagen" aspect-ratio="1.5"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="cerrarModalPremio" color="red">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Modal para comprar boleto -->
      <v-dialog v-model="modalVisible" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Comprar Boleto {{ boletoSeleccionado.numero }}</span>
          </v-card-title>
          <v-card-text>
            <div v-if="datosGuardados">
              <p>Valor: {{ boletoSeleccionado.valor }}</p>
            </div>
            <v-form ref="form" v-model="valid">
              <v-text-field 
                v-model="boletoSeleccionado.nombre_del_comprador" 
                label="Nombre" 
                required
                :rules="[v => !!v || 'Nombre es requerido']"
              />
              <v-text-field 
                v-model="boletoSeleccionado.telefono" 
                label="Teléfono" 
                required
                :rules="[ 
                  v => !!v || 'Teléfono es requerido', 
                  v => /^\d{10}$/.test(v) || 'El teléfono debe tener 10 dígitos' 
                ]"
                @keypress="validarNumeros"
              />
              <v-text-field 
                v-model="boletoSeleccionado.correo" 
                label="Correo (opcional)" 
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn 
              @click="guardarBoleto" 
              color="green" 
              :disabled="!valid" 
            >
              Guardar
            </v-btn>
            <v-btn @click="cerrarModal" color="red">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import Swal from 'sweetalert2'
  
  export default {
    setup() {
      const boletos = ref([])
      const modalVisible = ref(false)
      const modalPremioVisible = ref(false) // Nueva variable para controlar el modal del premio
      const boletoSeleccionado = ref({})
      const datosGuardados = ref(false)
      const valid = ref(false)
  
      const premioImagen = '/premio.jpg' // Cambia esto a la ruta de tu imagen
  
      onMounted(async () => {
        const url = 'https://serviciosfinanzas.udg.mx/api/api_srt/boletos'
        try {
          const response = await fetch(url)
          if (!response.ok) throw new Error('Error al cargar los boletos')
          boletos.value = await response.json()
        } catch (error) {
          console.error('Error cargando los boletos:', error)
        }
      })
  
      const abrirModal = (boleto) => {
        boletoSeleccionado.value = { ...boleto }
        modalVisible.value = true
        datosGuardados.value = false
        valid.value = false
      }
  
      const cerrarModal = () => {
        modalVisible.value = false
        // Reiniciar valores del boleto seleccionado al cerrar
        boletoSeleccionado.value = {
          numero: null,
          valor: null,
          nombre_del_comprador: '',
          telefono: '',
          correo: '',
          status: 'disponible',
        }
        datosGuardados.value = false
        valid.value = false
      }
  
      const abrirModalPremio = () => {
        modalPremioVisible.value = true
      }
  
      const cerrarModalPremio = () => {
        modalPremioVisible.value = false
      }
  
      const guardarBoleto = async () => {
        const url = 'https://serviciosfinanzas.udg.mx/api/api_srt/boletos'  // URL de la API para actualizar el boleto
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              ...boletoSeleccionado.value, 
              status: 'comprado' 
            }),
          })
  
          if (!response.ok) throw new Error('Error al guardar el boleto')
  
          // Actualizar el estado del boleto localmente
          const index = boletos.value.findIndex(boleto => boleto.numero === boletoSeleccionado.value.numero)
          if (index !== -1) {
            boletos.value[index] = { 
              ...boletoSeleccionado.value, 
              status: 'comprado' 
            }
            datosGuardados.value = true
  
            Swal.fire({
              title: 'Boleto Comprado!',
              text: `Boleto comprado por ${boletoSeleccionado.value.nombre_del_comprador}. Valor: $${boletoSeleccionado.value.valor}`,
              icon: 'success',
              confirmButtonText: 'OK'
            })
            cerrarModal()
          }
        } catch (error) {
          console.error('Error guardando el boleto:', error)
          Swal.fire({
            title: 'Error',
            text: 'No se pudo comprar el boleto.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      }
  
      const validarNumeros = (event) => {
        const key = event.key
        // Permitir solo números y teclas de control
        if (!/[0-9]/.test(key) && key !== "Backspace" && key !== "Delete" && key !== "Tab") {
          event.preventDefault()
        }
      }
  
      return {
        boletos,
        modalVisible,
        modalPremioVisible, // Agregar a los retornos
        boletoSeleccionado,
        abrirModal,
        cerrarModal,
        guardarBoleto,
        abrirModalPremio, // Agregar a los retornos
        cerrarModalPremio, // Agregar a los retornos
        datosGuardados,
        validarNumeros,
        valid,
        premioImagen, // Agregar a los retornos
      }
    }
  }
  </script>
  
  <style scoped>
  .sorteo-container {
    padding: 20px;
  }
  
  .disponible {
    background-color: #e0f7fa;
  }
  
  .comprado {
    background-color: #ffccbc;
  }
  </style>
  
