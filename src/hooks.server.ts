export const handle = async ({ event, resolve }) => {
  event.locals.validate = async () => {
    const res = await event.fetch("/api/auth").then((r) => r.json());
    const { user, session } = res;

    if (!user || !session) return null;

    return { user, session };
  };

  const res = await resolve(event);

  return res;
};
