export async function load({ fetch }) {
  const auth = fetch("/api/auth").then((r) => r.json());

  return { auth };
}
