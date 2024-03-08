export const getDate = (date: Date | string) => {
  const dateToConvert = typeof date === 'string' ? new Date(date) : date

  return `${dateToConvert.getDate()}.${
    dateToConvert.getMonth() && dateToConvert.getMonth() + 1 > 9
      ? dateToConvert.getMonth() + 1
      : `0${dateToConvert.getMonth() + 1}`
  }.${dateToConvert.getFullYear()}, ${dateToConvert.getHours()}:${
    dateToConvert.getMinutes() && dateToConvert.getMinutes() > 9
      ? dateToConvert.getMinutes()
      : `0${dateToConvert.getMinutes()}`
  }`;
};
