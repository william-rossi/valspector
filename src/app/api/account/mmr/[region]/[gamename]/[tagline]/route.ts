import { base_url } from "@/app/api/_lib/base-urls"
import { ErrorResponse } from "@/models/error"

export async function GET(
    _request: Request,
    { params }: { params: { region: string, gamename: string, tagline: string } }
) {
    try {
        if (!params.region || !params.gamename || !params.tagline) {
            return new Response(
                JSON.stringify({ error: "Region, gamename and tagline are required!" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            )
        }

        const response = await fetch(
            `${base_url}/v2/mmr/${params.region}/${params.gamename}/${params.tagline}`,
            {
                cache: 'no-store',
                headers: {
                    "Authorization": `${process.env.NEXT_PUBLIC_API_KEY}`
                },
            }
        )

        if (response.status === 404) {
            const e: ErrorResponse = {
                errors: [
                    {
                        message: "Account for MMR data not found.",
                        status: 404,
                        details: null
                    }
                ]
            }
            return new Response(
                JSON.stringify(e),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            )
        }

        if (!response.ok)
            throw new Error(`(${response.status}) There was a problem getting data.`)

        const data = await response.json()

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        const e: ErrorResponse = {
            errors: [
                {
                    message: (error as Error).message,
                    status: 500,
                    details: null
                }
            ]
        }
        return new Response(JSON.stringify(e), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
