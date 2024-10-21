export function generateCustomTransectionId() {
  const prefix = "cpi"; // Custom prefix
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "_";

  // Generate 22 random characters
  for (let i = 0; i < 22; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return prefix + id;
}
