export function convertYearToText(valor: string): string {
  const mapa: Record<string, string> = {
    "1ano": "1º Ano",
    "2ano": "2º Ano",
    "3ano": "3º Ano",
    "4ano": "4º Ano",
    "5ano": "5º Ano",
    "6ano": "6º Ano",
    "7ano": "7º Ano",
    "8ano": "8º Ano",
    "9ano": "9º Ano",
    "1medio": "1º Médio",
    "2medio": "2º Médio",
    "3medio": "3º Médio"
  };

  return mapa[valor] ?? "Selecione";
}
