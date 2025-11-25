export function formatTelefone(value: string) {
  value = value.replace(/\D/g, "");

  // Se apagar tudo → campo vazio
  if (value.length === 0) return "";

  // Limitar a 10 dígitos
  if (value.length > 10) value = value.slice(0, 10);

  // Se só tiver 1 dígito, não mostrar "(" ainda
  if (value.length === 1) {
    return value;
  }

  // Se tiver 2 dígitos → mostra apenas "(85"
  if (value.length === 2) {
    return `(${value}`;
  }

  // (DD) XXXX
  if (value.length <= 6) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }

  // (DD) XXXX-XXXX
  return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
}
