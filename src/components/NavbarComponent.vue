<script setup>
  import { ref, onMounted } from 'vue';
  import { RedirectLogin } from "../utils/manejo_errores.js";
  import router from "../router.js";
  /*import imagen from '../assets/prieto.jpg';*/

  /*const lcRutaProfile = ref(imagen);*/
  const lcNombre = ref('');
  const lcIniciales = ref('');

  const CerrarSession = ()=>{
    /*Eliminamos el nombre y el token del local storage*/
    // localStorage.removeItem('token');
    localStorage.removeItem('nombre');

    /*Le hacemos reedireccion al inicio de sesion*/
    router.push({ path: '/main' });
  }

  const redirectInicio = () => {
    router.push({ path: '/main' });
  }

  onMounted(()=>{
    let nombre = localStorage.getItem('nombre');
    if(nombre){
      lcNombre.value = nombre;
      let laNombre = lcNombre.value.split(' ').splice(0, 2);
      laNombre.map((item)=>{
        lcIniciales.value += item.charAt(0).toUpperCase();
      });
    }
  });
</script>

<template>

  <nav class="fixed-top">
    <!-- <div class="navbar navbar-expand-lg bg-finanzas-principal p-3">
      <div class="container-fluid flex justify-center">
        <div id="imagen">
          <img src="../assets/logo.svg" height="70" alt="Logo Universidad de Guadalajara" class="img-fluid mx-auto">
        </div>
      </div>
    </div> -->

    <v-toolbar density="compact" class="px-4 py-1 flex justify-between bg-finanzas-principal-light text-white font-SemiBold">

      <!--* Menu de opciones del sistema -->
      <v-menu class="shadow-xl">
        <template v-slot:activator="{ props }">
          <v-icon icon="mdi-menu" v-bind="props" role="button" aria-label="Abrir menú de opciones"></v-icon>
        </template>
        <!--* Lista para insertar los elementos del menú-->
        <v-list bg-color="black" color="white">
          <!--* Aqui van todos los links a las rutas que se necesiten -->
          <v-list-item>
            <div class="containerBtnMenu">
              <router-link to="/sesion" class="btnMenu">Administrar</router-link>
            </div>
          </v-list-item>

        </v-list>

      </v-menu>

      <v-toolbar-title>RIFA</v-toolbar-title>

      <v-btn prepend-icon="mdi-home-circle" @click="redirectInicio">Inicio</v-btn>

      <div class="flex justify-between align-middle">
        <div class="hidden md:flex mt-2.5 mx-3">
          <h4 class="font-SemiBold text-white">{{lcNombre}}</h4>
        </div>

        <!--* Imagen de perfil y opcion de cerrar sesion-->
        <div class="flex align-middle">
          <v-menu max-width="200" rounded>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-avatar class="mx-5" color="yellow-darken-2">
                  <!--<v-img :src="lcRutaProfile"></v-img>-->
                  <span class="text-h6 text-white">{{lcIniciales}}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text class="bg-finanzas-principal-light text-white">
                <div class="mx-auto text-center">
                  <v-divider class="my-2" color="#fff"></v-divider>
                  <v-btn variant="text" prepend-icon="mdi-logout" class="hover:font-SemiBold" rounded @click="CerrarSession">Cerrar sesión</v-btn>
                  <v-divider class="my-2" color="#fff"></v-divider>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
      </div>

    </v-toolbar>

  </nav>

</template>

<style scoped>

</style>