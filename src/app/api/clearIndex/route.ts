import { NextResponse } from "next/server";
import { Pinecone } from '@pinecone-database/pinecone'
import { routeProps } from "../checkIndex/route";

export async function POST({namespaceName}: routeProps) {
  // Instantiate a new Pinecone client
  const pinecone = new Pinecone();
  // Select the desired index
  const index = pinecone.Index(process.env.PINECONE_INDEX!)

  // Use the custom namespace, if provided, otherwise use the default
  const namespace = index.namespace(namespaceName)

  // Delete everything within the namespace
  await namespace.deleteAll();

  return NextResponse.json({
    success: true
  })
}
