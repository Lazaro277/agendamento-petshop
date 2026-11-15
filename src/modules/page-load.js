import { scheduleLoadByDay } from "./schedules/load-by-day.js"
import { scheduleDay } from "./schedules/load.js"

document.addEventListener("DOMContentLoaded", function () {
  scheduleDay()
  scheduleLoadByDay()
})