export function formatCPF(value: string) {
  value = value.replace(/\D/g, ""); // mantém só números

  if (value.length > 11) {
    value = value.slice(0, 11); // limita a 11 dígitos
  }

  if (value.length <= 3) {
    return value;
  }

  if (value.length <= 6) {
    return value.replace(/^(\d{3})(\d+)/, "$1.$2");
  }

  if (value.length <= 9) {
    return value.replace(/^(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  }

  return value.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{1,2})/,
    "$1.$2.$3-$4"
  );
}