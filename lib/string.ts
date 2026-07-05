/**
 * Memecah raw IP address (dari request) menjadi array berformat [ipv4, ipv6].
 * Berguna untuk mendeteksi kedua tipe IP jika tersedia (seperti ::ffff:127.0.0.1).
 */
export function parseIpAddress(
  rawIp: string | undefined,
): [string | null, string | null] {
  if (!rawIp) return [null, null];

  const ip = rawIp.split(",")[0]?.trim();
  if (!ip) return [null, null];

  let ipv4: string | null = null;
  let ipv6: string | null = null;

  if (ip.includes(":") && ip.includes(".")) {
    // IPv4-mapped IPv6 (e.g., "::ffff:127.0.0.1")
    ipv6 = ip;
    const parts = ip.split(":");
    ipv4 = parts[parts.length - 1] ?? null;
  } else if (ip.includes(":")) {
    // Pure IPv6 (e.g., "::1")
    ipv6 = ip;
  } else if (ip.includes(".")) {
    // Pure IPv4 (e.g., "127.0.0.1")
    ipv4 = ip;
  }

  return [ipv4, ipv6];
}
