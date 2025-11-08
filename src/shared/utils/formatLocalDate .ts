export const formatLocalDate = (dateString: string) => {
  const date = new Date(dateString);

  const corrected = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return corrected.toLocaleDateString('pt-BR');
};
