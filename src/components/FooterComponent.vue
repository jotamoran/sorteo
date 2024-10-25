<script setup>
  import {ref} from 'vue';

  const lbAviso = ref(false);

  function toggleAviso(){
      lbAviso.value = !lbAviso.value;
  }
</script>

<template>
  <footer class="text-center text-white bg-finanzas-principal mt-3">
    <div id="derechos" class="p-2 bg-slate-950/[0.2]">
      Derechos reservados &#169; {{new Date().getFullYear()}}
    </div>
    <!-- <div class="p-2">
      <span id="botonAviso" @click="toggleAviso" class="hover:cursor-pointer">
        Aviso de privacidad <v-icon v-show="!lbAviso" icon="mdi-arrow-up-bold"></v-icon> <v-icon v-show="lbAviso" icon="mdi-arrow-down-bold"></v-icon>
      </span>
    </div> -->
    <!-- <div class="p-3 block text-white text-justify" v-show="lbAviso">
      AVISO DE PRIVACIDAD: La Universidad de Guadalajara (UdeG), con domicilio en Avenida Juárez 976, colonia Centro, código postal 44100, en Guadalajara, Jalisco, hace de su conocimiento que se considerará como información confidencial aquella que se encuentre contemplada en los artículos 3, fracciones IX y X de la LPDPPSOEJM; 21 de la LTAIPEJM; Lineamientos Cuadragésimo Octavo y Cuadragésimo Noveno de los Lineamientos de Clasificación; Lineamientos Décimo Sexto, Décimo Séptimo y Quincuagésimo Octavo de los Lineamientos de Protección, así como aquellos datos de una persona física identificada o identificable y la inherente a las personas jurídicas, los cuales podrán ser sometidos a tratamiento y serán única y exclusivamente utilizados para los fines que fueron proporcionados, de acuerdo con las finalidades y atribuciones establecidas en los artículos 1, 5 y 6 de la Ley Orgánica, así como 2 y 3 del Estatuto General, ambas legislaciones de la UdeG, de igual forma, para la prestación de los servicios que la misma ofrece conforme a las facultades y prerrogativas de la entidad universitaria correspondiente y estarán a resguardo y protección de la misma. Usted puede consultar nuestro Aviso de Privacidad integral en la siguiente página web:<br>
      <a href="http://www.transparencia.udg.mx/aviso-confidencialidad-integral" target="_blank" rel="noopener noreferrer" style="color: white;">http://www.transparencia.udg.mx/aviso-confidencialidad-integral</a>
    </div> -->
  </footer>
</template>

<style scoped>
</style>