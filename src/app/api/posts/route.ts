import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://1ndrajeet:itsBatm4n@projects.b4hev.mongodb.net/";
const client = new MongoClient(uri);
const dbName = "blog";
const collectionName = "posts";

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Database connection failed");
  }
}

// GET handler for fetching posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const collection = await connectToDatabase();
    const posts = await collection
      .find({
        isDiary: type === "diary",
        ...(type === "blog" ? { isPublished: true } : {})
      })
      .sort({ publishedAt: -1 })
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// POST handler for creating new posts
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content || !body.excerpt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

   
    const collection = await connectToDatabase();
    const post = await collection.insertOne({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      tags: Array.isArray(body.tags) ? body.tags : [],
      imageUrl: body.imageUrl || "",
      isDiary: Boolean(body.isDiary),
      isPublished: !body.isDiary,
      publishedAt: new Date(),
      readTime: Math.ceil(body.content.split(" ").length / 200),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ 
      _id: post.insertedId,
      ...body,
      publishedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// PUT handler for publishing diary entries to blog
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("id");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const collection = await connectToDatabase();
    const result = await collection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          isDiary: false,
          isPublished: true,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to publish post:", error);
    return NextResponse.json(
      { error: "Failed to publish post" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
