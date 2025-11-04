import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { tag } = await params

  const res = await fetch(`${process.env.CLASH_ROYALE_API_URL}/players/${tag}`, {
    headers: {
      'Authorization': `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
      'Accept': 'application/json'
    }
  })

  const data = await res.json()
  return NextResponse.json(data)
}
