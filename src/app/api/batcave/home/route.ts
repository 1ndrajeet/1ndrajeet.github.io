import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

// Helper to check führer designation

export async function GET() {
  try {
    const db = await getDb();

    // Fetch projects, about, and certifications data in parallel
    const [projects, aboutData, certifications] = await Promise.all([
      db.collection('project_data').find({}).toArray(),
      db.collection('about_data').find({}).toArray(),
      db.collection('certificates').find({}).toArray()
    ]);

    // Transform MongoDB documents to remove internal _id and convert ObjectId to string
    type MongoDoc = { _id: ObjectId; [key: string]: unknown };
    const transformData = (data: MongoDoc[]) => data.map(item => ({
      ...item,
      _id: item._id.toString()
    }));

    return NextResponse.json({
      projects: transformData(projects),
      about: transformData(aboutData),
      certifications: transformData(certifications)
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Check designation
  // await checkFuhrerDesignation();

  try {
    const body = await req.json();
    const { collection, data } = body;

    if (!collection || !data) {
      return NextResponse.json({ error: 'Missing collection or data' }, { status: 400 });
    }

    if (!['project_data', 'about_data', 'certificates'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(collection).insertOne(data);

    return NextResponse.json({
      message: `Successfully added to ${collection}`,
      id: result.insertedId.toString(),
      data,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating data:', error);
    return NextResponse.json({ error: 'Failed to create data' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  // Check designation
  // await checkFuhrerDesignation();

  try {
    const body = await req.json();
    const { collection, id, data } = body;

    if (!collection || !id || !data) {
      return NextResponse.json({ error: 'Missing collection, id, or data' }, { status: 400 });
    }

    if (!['project_data', 'about_data', 'certificates'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(collection).updateOne(
      { _id: ObjectId.createFromHexString(id) },
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
  // await checkFuhrerDesignation();

  try {
    const body = await req.json();
    const { collection, id } = body;

    if (!collection || !id) {
      return NextResponse.json({ error: 'Missing collection or id' }, { status: 400 });
    }

    if (!['project_data', 'about_data', 'certificates'].includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(collection).deleteOne({ _id: ObjectId.createFromHexString(id) });
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