// /app/api/certificates/route.ts
import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const db = await getDb();
    const url = new URL(request.url);
    const isFeatured = url.searchParams.get('featured') === 'true';

    const certificates = await db
      .collection('certificates')
      .find(isFeatured ? { featured: true } : {})
      .sort({ createdAt: -1 })
      .limit(isFeatured ? 3 : 0)
      .toArray();

    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}
