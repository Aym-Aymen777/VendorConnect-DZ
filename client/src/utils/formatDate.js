export const formatDate = (isoString) => {
  if (!isoString) return "";
  // new Date(isoString).toISOString() → "2006-01-23T00:00:00.000Z"
  return new Date(isoString).toISOString().split("T")[0];
};