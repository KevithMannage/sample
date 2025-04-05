import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMongoSchema, isCollectionAllowed } from './schemaService.js';
import { db } from './mongoService.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


let memory = [];

// Helper to summarize conversation (optional for logging/UI)
function summarizeConversation(userMessage, botReply) {
  return `User: ${userMessage} | Bot: ${botReply}`.slice(0, 100);
}

// Execute MongoDB pipeline
async function executeMongoQuery(collectionName, pipelineText) {
  try {
    const pipeline = JSON.parse(pipelineText);
    const collection = db.collection(collectionName);
    const results = await collection.aggregate(pipeline).toArray();
    return { [collectionName]: results };
  } catch (error) {
    return { error: error.message };
  }
}

export async function handleChat(userMessage) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // ✅ Include chat history when starting the chat
  const chat = await model.startChat({
    history: memory.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }))
  });

  // Get MongoDB schema
  const schema = await getMongoSchema();

  // Prompt Gemini to generate MongoDB pipeline
  const queryPrompt = `
Based on this MongoDB schema:
${JSON.stringify(schema)}

Generate only a MongoDB aggregation pipeline query to answer:
"${userMessage}"

First line: collection name
Then: the aggregation pipeline (no markdown, no explanation).
Use None instead of null (Python style).
`;

  const queryResponse = await chat.sendMessage(queryPrompt);
  const output = queryResponse.response.text().trim();

  const [collection, ...lines] = output.split('\n');
  const pipeline = lines.join('\n');

  const results = await executeMongoQuery(collection.trim(), pipeline);

  let finalPrompt;

  if (!results.error && results[collection]?.length > 0) {
    finalPrompt = `
You are Carrie, a friendly chatbot for the GuidlineX app.

Based on MongoDB results:
${JSON.stringify(results)}

User asked:
"${userMessage}"

Guidelines:
- Be friendly and accurate
- Avoid private info
- Say "I don’t have enough knowledge" if needed
- Use INR when needed
- letters in inside ** ** is open with new line
- letters in inside * * is open with new line
- Use emojis when needed
    `;
  } else {
    finalPrompt = `
You are Carrie, a friendly chatbot for the GuidlineX app.

There is no data available for this question:
"${userMessage}"

Still be friendly and helpful.
Say "I don’t have enough knowledge" if needed.
Suggest alternative questions if possible.
    `;
  }

  const finalResponse = await chat.sendMessage(finalPrompt);
  const reply = finalResponse.response.text();

  memory.push({ role: 'user', content: userMessage });
  memory.push({ role: 'model', content: reply });

  return reply;
}
