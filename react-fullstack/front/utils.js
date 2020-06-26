const addZeroInDate = (num) => {
  num = parseInt(num);
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

const dateFormat = (date) => {
  if (date) {
    let newDate = new Date(date);
    let year = newDate.getFullYear().toString();
    let month = newDate.getMonth().toString();
    let dates = newDate.getDate().toString();
    return `${year} - ${addZeroInDate(month)} - ${addZeroInDate(dates)}`;
  } else {
    return "";
  }
};

export { dateFormat };
