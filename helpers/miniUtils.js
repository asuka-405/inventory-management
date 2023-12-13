const MSG_TYPES = ["SUCCESS", "ERROR", "WARNING", "INFO"]
export function newMessage(type, message, err) {
  return {
    type: MSG_TYPES[type],
    message,
    err,
  }
}
