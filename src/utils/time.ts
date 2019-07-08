const ago = (utc: string) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerHour = 60 * 60 * 1000;
  const millisecondsPerMinute = 60 * 1000;
  const gap = new Date().getTime() - Date.parse(utc)
  if (gap >= millisecondsPerDay) {
    return `${Math.round(gap / millisecondsPerDay)} day(s) ago`
  } else if (gap >= millisecondsPerHour) {
    return `${Math.round(gap / millisecondsPerHour)} hour(s) ago`
  } else if (gap >= millisecondsPerMinute) {
    return `${Math.round(gap / millisecondsPerMinute)} minutes(s) ago`
  } else {
    return 'now'
  }
}

export {
  ago as default
}
