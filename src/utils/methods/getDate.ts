export const getDate = (date: Date) => {
  return `${date.getDate()}.${
    date.getMonth() && date.getMonth() > 9
      ? date.getMonth()
      : `0${date.getMonth()}`
  }.${date.getFullYear()}, ${date.getHours()}:${
    date.getMinutes() && date.getMinutes() > 9
      ? date.getMinutes()
      : `0${date.getMinutes()}`
  }`;
};
