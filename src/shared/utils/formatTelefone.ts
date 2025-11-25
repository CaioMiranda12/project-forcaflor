export function formatTelefone(value: string) {
  value = value.replace(/\D/g, "");

  // Limita a 10 dígitos
  if (value.length > 10) value = value.slice(0, 10);

  if (value.length <= 2) {
    return `(${value}`;
  }
  if (value.length <= 6) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }
  return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
}
