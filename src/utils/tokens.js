export function ObtenerHeaderBearer(){
    return { 'Authorization': `Bearer ${token.value}` };
}