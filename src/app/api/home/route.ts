import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const db = await getDb();

    // Get the 'featured' param from the URL
    const { searchParams } = new URL(request.url);
    const featuredParam = searchParams.get('featured');
    const featured = featuredParam === 'true';

    // Build the query
    const query = featuredParam !== null ? { featured } : {};

    let cursor = db.collection('certificates')
      .find(query)
      .sort({ createdAt: -1 });

    if (featuredParam !== null) {
      cursor = cursor.limit(3);
    }

    const certificateQuery = await cursor.toArray();


    const [projects, aboutData, certificates] = await Promise.all([
      db.collection('project_data').find({}).toArray(),
      db.collection('about_data').find({}).toArray(),
      certificateQuery
    ]);

    return NextResponse.json({
      projects,
      about: aboutData,
      certificates
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
