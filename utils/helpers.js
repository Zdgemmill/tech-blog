module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString();
  },
};
