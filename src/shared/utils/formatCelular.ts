export function formatCelular(value: string) {
  value = value.replace(/\D/g, "");

  // Se apagar tudo → campo vazio
  if (value.length === 0) return "";

  // Limitar a 11 dígitos
  if (value.length > 11) value = value.slice(0, 11);

  // Se só tiver 1 dígito, não mostrar "(" ainda
  if (value.length === 1) {
    return value;
  }

  // Se tiver 2 dígitos → mostra apenas "(85"
  if (value.length === 2) {
    return `(${value}`;
  }

  // (DD) XXXXX
  if (value.length <= 7) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }

  // (DD) XXXXX-XXXX
  return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
}
