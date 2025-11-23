export function calcIdade(dataNascimento: string) {
  const [dia, mes, ano] = dataNascimento.split("/").map(Number)
  const nascimento = new Date(ano, mes - 1, dia)
  const hoje = new Date()

  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mesAtual = hoje.getMonth()
  const mesNascimento = nascimento.getMonth()

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
  ) {
    idade--
  }

  return idade
}
