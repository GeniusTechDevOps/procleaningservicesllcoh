import type { APIRoute } from "astro";
import type { RootObject } from "../interfaces/dbData";
import { buildLlmsText, getSiteOrigin } from "../lib/aiDiscovery";
import { getAppDataDirect } from "../utils/api";

export const GET: APIRoute = async ({ request }) => {
  try {
    const data = await getAppDataDirect();
    const siteOrigin = getSiteOrigin(data, request.url);
    const content = buildLlmsText(data, siteOrigin);

    return new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new Response("Unable to load llms.txt content.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
};

