<template>
  <v-container class="flex justify-center align-middle">
    <v-row align="center" justify="center" class="mt-5">
      <v-col cols="12" lg="4" md="8">
        <v-card class="p-5 border rounded-4 shadow">
          <v-card-title class="text-center bg-red rounded-2 mb-4 text-wrap">
            <h4>Admin del sorteo</h4>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                class="col-12"
                v-model="usuario"
                label="Usuario"
                required
              ></v-text-field>

              <v-text-field
                class="col-12"
                v-model="contrasena"
                label="Contraseña"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions class="d-flex flex-column align-items-center">
            <v-btn
              block
              variant="elevated"
              color="blue-darken-1"
              rounded-sm
              @click="consultarEstatus"
              :disabled="cargando"
            >
              Ingresar
              <v-icon class="ml-2">mdi-login</v-icon>
            </v-btn>

            <v-row v-if="cargando" class="mt-3">
              <v-col class="text-center">
                <img src="/cargando.gif" width="75" alt="Cargando...">
              </v-col>
            </v-row>

            <small class="form-text text-muted text-center">
              <!-- <strong>El usuario y contraseña fueron enviados por correo al confirmar la cita.</strong> -->
            </small>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const usuario = ref('');
const contrasena = ref('');
const valid = ref(false);
const cargando = ref(false);

onMounted(() => {
  if (localStorage.getItem('nombre')) {
    router.push('/admin');
  }
});

const consultarEstatus = async () => {
  if (!usuario.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Usuario requerido',
      text: 'Por favor ingresa tu usuario.'
    });
    return;
  }

  if (!contrasena.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Contraseña requerida',
      text: 'Por favor ingresa tu contraseña.'
    });
    return;
  }

  cargando.value = true;

  try {
    const response = await autenticarUsuario(usuario.value, contrasena.value);
    cargando.value = false;

    if (response.autenticado) {
      localStorage.setItem("nombre", "Administrador");
      Swal.fire({
        icon: 'success',
        title: '¡Ingreso exitoso!',
        text: 'Redirigiendo a la página de administrador...',
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos. Inténtalo nuevamente.'
      });
      reiniciarFormulario();
    }
  } catch (error) {
    cargando.value = false;
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor. Inténtalo más tarde.'
    });
    reiniciarFormulario();
  }
};

const reiniciarFormulario = () => {
  usuario.value = '';
  contrasena.value = '';
  valid.value = false;
};

const autenticarUsuario = async (usuario, contrasena) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        autenticado: usuario === 'admin' && contrasena === 'admin123@'
      });
    }, 1000);
  });
};
</script>

<style scoped>
.text-wrap {
  word-wrap: break-word;
}
</style>
