import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { auth } from "@/server/lib/auth";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  const session = await auth.api.getSession({ headers: req.headers });

  return createTRPCContext({
    headers: req.headers,
    currentUser: session?.user ?? null,
  });
};

const handler = async (req: NextRequest) => {
  const trpcResponse = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

  /**
   * This is a workaround to extract the session cookie from the tRPC response.
   *
   * The tRPC response is a stream, and we need to read it to find the session cookie.
   * The response is expected to be in the format:
   *  {"json":[2,0,[[{"success":true,"sessionCookie":"..."}]]]}
   * We parse the response line by line to find the session cookie.
   * If the session cookie is found, we set it in the response headers.
   *
   * Note: This is a workaround because tRPC resHeaders are not working as expected
   * in the Next.js version 15.0.0 and above.
   * This should be removed once the tRPC response headers are fixed in Next.js.
   *
   * See: https://github.com/t3-oss/create-t3-app/issues/2138
   */

  // Read stream once
  const responseText = await trpcResponse.text();

  let sessionCookie: string | undefined;

  const lines = responseText.split("\n").filter(Boolean);
  for (const line of lines) {
    try {
      const parsedLineRaw = JSON.parse(line) as unknown;
      if (
        typeof parsedLineRaw === "object" &&
        parsedLineRaw !== null &&
        "json" in parsedLineRaw
      ) {
        const parsedLine = parsedLineRaw as { json: unknown };
        // Based on your previous log: {"json":[2,0,[[{"success":true,"sessionCookie":"..."}]]]}
        // We are looking for a line where `json` is an array that contains the actual procedure result.
        if (
          Array.isArray(parsedLine.json) &&
          parsedLine.json.length > 2 &&
          Array.isArray(parsedLine.json[2]) &&
          parsedLine.json[2].length > 0 &&
          Array.isArray(parsedLine.json[2][0]) // Make sure it's array within array
        ) {
          const resultPayload = parsedLine.json[2][0][0] as {
            success: boolean;
            sessionCookie?: string;
          }; // Access the actual object { success: true, sessionCookie: "..." }
          if (
            resultPayload &&
            typeof resultPayload === "object" &&
            "sessionCookie" in resultPayload &&
            "success" in resultPayload &&
            (resultPayload as { success: boolean }).success === true
          ) {
            sessionCookie = (resultPayload as { sessionCookie?: string })
              .sessionCookie;
            break;
          }
        }
      }
    } catch (e) {
      console.error("Error parsing response:", e);
    }
  }

  const finalResponse = new NextResponse(responseText, {
    status: trpcResponse.status,
    headers: trpcResponse.headers,
  });

  if (sessionCookie) {
    finalResponse.headers.set("Set-Cookie", sessionCookie);
  }

  return finalResponse;
};

export { handler as GET, handler as POST };
