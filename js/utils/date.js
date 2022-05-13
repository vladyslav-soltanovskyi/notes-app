export function convertDate(date) {
    return (new Date(date)).toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
}

export function convertTime(date) {
    return (new Date(date)).toLocaleString("en-US", {
      month: "numeric",
      day: "numeric"
    });
}

export function convertFullDate(date) {
  return (new Date(date)).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
}