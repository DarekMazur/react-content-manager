export const getDate = (date: Date) => {
  return `${date.getDate()}.${
    date.getMonth() && date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`
  }.${date.getFullYear()}, ${date.getHours()}:${
    date.getMinutes() && date.getMinutes() > 9
      ? date.getMinutes()
      : `0${date.getMinutes()}`
  }`;
};
