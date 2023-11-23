const formatDate = (date, locale = "en-US") => {
  if (!date) return null;

  const opts = { year: "numeric", month: "long", day: "numeric" }
  const formattedDate = new Date(date)
  return formattedDate.toLocaleDateString(locale, opts)
};

export default formatDate
