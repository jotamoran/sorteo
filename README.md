# Plantilla para proyectos de Vue

Se instalaron los siguientes paquetes:
- Vuetify
- VueRouter
- TailwindCSS
- Bootstrap 5
- MDI Icons
- Axios
- Sweetalert 2 (Se debe llamar en el archivo que se necesite)

La paleta de colores es la de los 30 años y se encuentra en el archivo "tailwind.config.js"
Esos colores son los siguientes:
- finanzas-principal: #1E4693
- finanzas-principal-light: #2559BA
- finanzas-secundario: #F5CC00
- finanzas-secundario-light: #FFD500
- finanzas-cancelar: #E3212E
- finanzas-cancelar-light: #F22432
- finanzas-azul: #00ADFF
- finanzas-azul-light: #00AEFF

Para definir los tipos de fuente (normal, bold o semi bold) se usan las clases de tailwind que estan definidas en el archivo de configuracion.
Se usan como:
- font-Bold
- font-Regular
- font-SemiBold

## Protección de rutas
Dentro  del archivo router se deben importar los componentes que usara cada ruta. Si se necesita que la ruta sea protegida por token, se usa la propiedad "beforeEnter" y se llama a la funcion "requireAuth".
Esa funcion puede colocar por defecto un token para hacer pruebas si es que no existe.

El router esta en modo WebHistory, se puede cambiar para ser modo PWA

En el archivo de tokens.js dentro de utils esta la funcion para obtener directamente el header para hacer peticiones con
el Bearer token. 
Dentro del archivo manejo_errores.js hay otra funcion que se puede importar para hacer reedirección al login.

## Manejo de componentes
Dentro de la carpeta "views" se colocan los componentes principales que envuelven los demas componentes (Rutas).
En la carpeta "components" van los que se pueden reutilizar para otras views.


#   s o r t e o  
 