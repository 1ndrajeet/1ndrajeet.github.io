import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await getDb();

    const certificateQuery =  db.collection('certificates')
          .find({ featured: true })
          .sort({ createdAt: -1 })
          .limit(3)
          .toArray()

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
