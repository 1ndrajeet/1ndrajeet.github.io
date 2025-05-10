const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://1ndrajeet:itsBatm4n@projects.b4hev.mongodb.net/'; // Change if needed
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db('portfolio');
    const certificates = db.collection('certificates');

    // Optional: Drop collection if re-running script
    // await certificates.drop().catch(() => {});

    await certificates.insertMany([
      {
        id: "1",
        title: "Winner - RIT Hackathon 2K25",
        date: "March 24, 2025",
        organization: "RIT, Islampur",
        college: "RIT, Islampur",
        description: "Secured first place in RIT Hackathon 2K25 by developing an innovative solution under intense competition and tight deadlines.",
        image: "/projects/testforge.png",
        alt: "RIT Hackathon Winner Certificate",
        category: "Hackathon",
        skills: ["Team Collaboration", "Innovation", "Full Stack Development", "Problem Solving"],
        featured: true
      },
      {
        id: "2",
        title: "Winner - CodeBlaze 2K25",
        date: "March 10, 2025",
        organization: "Government Polytechnic Karad",
        college: "Government Polytechnic Karad",
        description: "Achieved first place in CodeBlaze 2K25 for outstanding coding and problem-solving skills in competitive programming challenges.",
        image: "/certificates/codeblaze-winner.png",
        alt: "CodeBlaze Winner Certificate",
        category: "Competition",
        skills: ["Competitive Programming", "DSA", "Teamwork", "Debugging"]
      },
      {
        id: "3",
        title: "Runner-up - Quiz Competition",
        date: "March 10, 2025",
        organization: "Government Polytechnic Karad",
        college: "Government Polytechnic Karad",
        description: "Awarded second place in the Quiz Competition for demonstrating excellent general and technical knowledge.",
        image: "/certificates/quiz-runnerup.png",
        alt: "Quiz Runner-up Certificate",
        category: "Quiz",
        link: "#",
        skills: ["General Knowledge", "Technical Aptitude", "Critical Thinking"]
      }
    ]);

    console.log('Certificates inserted successfully!');
  } finally {
    await client.close();
  }
}

run().catch(console.error);
