import { cookies, headers } from "next/headers";
import { getServerSession as originlGetServerSession } from "next-auth";
import { authOptions as originalAuthOptions } from "./authOptions";

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };
  const authOptions = originalAuthOptions;
  //@ts-ignore
  const session = await originlGetServerSession(req, res, authOptions);
  return session;
};
