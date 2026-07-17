// =====================================================================
//  Validaciones y formateadores de campos (Chile).
// =====================================================================

export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// ---- RUT chileno ------------------------------------------------------
export function limpiarRut(rut: string): string {
  return rut.replace(/[^0-9kK]/g, "").toUpperCase();
}

export function formatearRut(rut: string): string {
  const limpio = limpiarRut(rut);
  if (limpio.length < 2) return limpio;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  const conPuntos = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${conPuntos}-${dv}`;
}

export function validarRut(rut: string): boolean {
  const limpio = limpiarRut(rut);
  if (limpio.length < 2) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;
  let suma = 0;
  let mul = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === dvEsperado;
}

// ---- Teléfono chileno (+56 9 XXXX XXXX) -------------------------------
export function validarTelefono(tel: string): boolean {
  const d = tel.replace(/\D/g, "");
  // Acepta 9 dígitos (móvil) o con prefijo 56
  return d.length === 9 || (d.length === 11 && d.startsWith("56"));
}

// ---- Tarjeta de crédito ----------------------------------------------
export function formatearTarjeta(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 19);
  return d.replace(/(.{4})/g, "$1 ").trim();
}

// Algoritmo de Luhn
export function validarTarjeta(numero: string): boolean {
  const d = numero.replace(/\D/g, "");
  if (d.length < 13 || d.length > 19) return false;
  let suma = 0;
  let alt = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    suma += n;
    alt = !alt;
  }
  return suma % 10 === 0;
}

export function formatearVencimiento(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

// Vencimiento MM/AA, no expirado
export function validarVencimiento(valor: string): boolean {
  const m = valor.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mes = parseInt(m[1], 10);
  const anio = 2000 + parseInt(m[2], 10);
  if (mes < 1 || mes > 12) return false;
  const ahora = new Date();
  const fin = new Date(anio, mes, 0, 23, 59, 59); // último día del mes
  return fin.getTime() >= ahora.getTime();
}

export function validarCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv.trim());
}

// ---- Utilidades genéricas --------------------------------------------
export function requerido(valor: string): boolean {
  return valor.trim().length > 0;
}

export function soloDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}
