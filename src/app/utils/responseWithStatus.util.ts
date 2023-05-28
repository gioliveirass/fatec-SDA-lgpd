export default function responseWithStatus(message: any, status: number) {
  return { message: message, status: status };
}
