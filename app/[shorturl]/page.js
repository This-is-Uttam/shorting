export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const shorturl = (await params).shorturl

  //  connect to db
  const client = await clientPromise;
  const db = client.db("shorting")
  const collection = db.collection("urls")


  const doc = await collection.findOne({ shorturl: shorturl })
  console.log(doc)
  if (doc) {
    redirect(doc.url)
  }
  else {
    notFound()
  }
}