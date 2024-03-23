type DateOptionsType = {
  month: "short";
};

export const dateOptions: DateOptionsType = {
  month: "short",
};

export const formatDate = (date: string) => {
  const dateParsed = Date.parse(date);

  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = new Intl.DateTimeFormat("en-US", dateOptions).format(dateParsed);
  const year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
};
