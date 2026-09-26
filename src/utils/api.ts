import type { RootObject } from "../interfaces/dbData";

export type FetchResult<T> =
    | {
        ok: true;
        data: T;
    }
    | {
        ok: false;
        error: string;
        status?: number;
    };

function getApiUrl(): string {
    const apiUrl = import.meta.env.API_URL;
    return apiUrl ? String(apiUrl).trim() : "";
}

function getPageId(): string {
    const pageId = import.meta.env.IDCLIENTE;

    if (!pageId) {
        throw new Error("Missing IDCLIENTE environment variable");
    }

    return String(pageId).trim();
}

function getPublicGeoBaseUrl(): string {
    const publicGeoBaseUrl = import.meta.env.PUBLIC_GEO_BASE_URL;

    if (!publicGeoBaseUrl) {
        throw new Error("Missing PUBLIC_GEO_BASE_URL environment variable");
    }

    return String(publicGeoBaseUrl).trim().replace(/\/+$/, "");
}

function getPublicGeoApiKey(): string {
    const publicGeoApiKey = import.meta.env.PUBLIC_GEO_API_KEY;

    if (!publicGeoApiKey) {
        throw new Error("Missing PUBLIC_GEO_API_KEY environment variable");
    }

    return String(publicGeoApiKey).trim();
}

export function buildPublicGeoPageUrl(pageId: string = getPageId()): string {
    return `${getPublicGeoBaseUrl()}/${pageId}`;
}

export async function fetchAppData(): Promise<FetchResult<RootObject>> {
    try {
        const apiUrl = getApiUrl();

        // Si API_URL está vacía, carga datos locales
        if (!apiUrl) {
            try {
                const localData = await import("../lib/localData.json");
                const data = localData.default as RootObject;
                return { ok: true, data };
            } catch (err: any) {
                return {
                    ok: false,
                    error: `Failed to load local data: ${err?.message ?? String(err)}`,
                };
            }
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return {
                ok: false,
                error: `Main API request failed: ${response.status} ${response.statusText}`,
                status: response.status,
            };
        }

        const data = (await response.json()) as RootObject;
        return { ok: true, data };
    } catch (err: any) {
        return { ok: false, error: err?.message ?? String(err) };
    }
}

export async function fetchPublicGeoPage(
    pageId: string = getPageId(),
): Promise<FetchResult<unknown>> {
    const url = buildPublicGeoPageUrl(pageId);

    try {
        const res = await fetch(url, {
            headers: {
                "x-api-key": getPublicGeoApiKey(),
            },
        });

        if (!res.ok) {
            return {
                ok: false,
                error: `Fetch public geo page failed: ${res.status} ${res.statusText}`,
                status: res.status,
            };
        }

        const data = await res.json();
        return { ok: true, data };
    } catch (err: any) {
        return { ok: false, error: err?.message ?? String(err) };
    }
}

/**
 * Helper function for .astro files to fetch app data
 * Returns data directly (throws on error) - use for SSR pages
 */
export async function getAppDataDirect(): Promise<RootObject> {
    const apiUrl = getApiUrl();

    // Si API_URL está vacía, carga datos locales
    if (!apiUrl) {
        const localData = await import("../lib/localData.json");
        return localData.default as RootObject;
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch app data: ${response.status}`);
    }

    return (await response.json()) as RootObject;
}
