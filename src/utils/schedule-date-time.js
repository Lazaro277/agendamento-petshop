export function scheduleDate(scheduleTime) {
  return String(scheduleTime).slice(0, 10)
}

export function scheduleTime(scheduleTime) {
  return String(scheduleTime).slice(11, 16)
}

export function scheduleHour(scheduleTime) {
  return Number(String(scheduleTime).slice(11, 13))
}
