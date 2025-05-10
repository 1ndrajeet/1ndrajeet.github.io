import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// Helper to check führer designation


export async function GET() {
    try {
      const db = await getDb();
      
      // Fetch both projects and about data in parallel
      const [projects, aboutData] = await Promise.all([
        db.collection('project_data').find({}).toArray(),
        db.collection('about_data').find({}).toArray()
      ]);
  
      // Remove MongoDB's internal _id field from projects
      
      
      return NextResponse.json({
        projects,
        about: aboutData
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
  
  }
  

export async function POST(req: Request) {
  // Check designation

  try {
    const body = await req.json();
    const { collection, data } = body;

    if (!collection || !data) {
      return NextResponse.json({ error: 'Missing collection or data' }, { status: 400 });
    }

    if (!['project_data', 'about_data'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(collection).insertOne(data);

    return NextResponse.json({
      message: `Successfully added to ${collection}`,
      id: result.insertedId,
      data,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating data:', error);
    return NextResponse.json({ error: 'Failed to create data' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  // Check designation

  try {
    const body = await req.json();
    const { collection, id, data } = body;

    if (!collection || !id || !data) {
      return NextResponse.json({ error: 'Missing collection, id, or data' }, { status: 400 });
    }

    if (!['project_data', 'about_data'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `Successfully updated in ${collection}`,
      modifiedCount: result.modifiedCount,
      data,
    });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  // Check designation

  try {
    const body = await req.json();
    const { collection, id } = body;

    if (!collection || !id) {
      return NextResponse.json({ error: 'Missing collection or id' }, { status: 400 });
    }

    if (!['project_data', 'about_data'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `Successfully deleted from ${collection}`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}