export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.json()

    const client = await clientPromise;
    const db = client.db("shorting")
    const collection = db.collection("urls")

    // Check if the short url exists
    const doc = await collection.findOne({shorturl: body.shorturl})
    if(doc){
        return Response.json({success: false, error: true,  message: 'Short URL already exists!' })
    }

    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    })

    return Response.json({success: true, error: false,  message: 'Short URL Generated Successfully' })
}
