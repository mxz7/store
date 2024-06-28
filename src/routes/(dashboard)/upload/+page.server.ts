import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
  const { auth } = await parent();

  if (!auth.authenticated) return redirect(302, "/login");
}

export const actions = {
  default: async ({ request }) => {
    const res = await request.json();

    console.log(res);
  },
};
