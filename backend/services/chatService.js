import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMongoSchema, isCollectionAllowed } from './schemaService.js';
import { db } from './mongoService.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let memory = [];

function summarizeConversation(userMessage, botReply) {
  return `User: ${userMessage} | Bot: ${botReply}`.slice(0, 100);
}

async function executeMongoQuery(collection, query) {
  try {
    if (!isCollectionAllowed(collection)) {
      return { error: `Invalid collection: ${collection}` };
    }
    const parsed = eval(query);
    if (!Array.isArray(parsed)) {
      return { error: 'Query must be an aggregation pipeline (array)' };
    }
    const results = await db.collection(collection).aggregate(parsed).toArray();
    return { [collection]: results };
  } catch (err) {
    return { error: err.message };
  }
}

export async function handleChat(userMessage) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const chat = await model.startChat();

  const schema = await getMongoSchema();
  const history = memory.map(m => `${m.role}: ${m.content}`).join('\n');

  const queryPrompt = `
Based on this MongoDB schema:
${JSON.stringify(schema)}

Previous conversation:
${history}

Generate only a MongoDB aggregation pipeline query to answer:
${userMessage}

First line: collection name
Then: the aggregation pipeline (no markdown, no explanation).
Use None instead of null (Python style).
`;

  const queryResponse = await chat.sendMessage(queryPrompt);
  const output = queryResponse.response.text().trim();
  const [collection, ...lines] = output.split('\n');
  const pipeline = lines.join('\n');

  // 👇 Log the MongoDB query
  console.log('\n💬 Chatbot generated MongoDB query:');
  console.log('Collection:', collection.trim());
  console.log('Aggregation Pipeline:\n', pipeline);

  const results = await executeMongoQuery(collection.trim(), pipeline);

  let finalPrompt;
  if (!results.error && results[collection]?.length > 0) {
    finalPrompt = `
You are Carrie, a friendly chatbot for the GuidlineX app.

Based on MongoDB results:
${JSON.stringify(results)}

User asked:
${userMessage}

Guidelines:
- Be friendly and accurate
- Avoid private info
- Say "I don’t have enough knowledge" if needed
- Use INR when needed
    `;
  } else {
    finalPrompt = `
You are Carrie, a friendly chatbot for the GuidlineX app.
Even though there is no data for this question: "${userMessage}", still be friendly and helpful.
Say "I don’t have enough knowledge" if needed.
Suggest alternative questions if possible.
    `;
  }

  const finalResponse = await chat.sendMessage(finalPrompt);
  const reply = finalResponse.response.text();
  const summary = summarizeConversation(userMessage, reply);

  memory.push({ role: 'user', content: `${userMessage} | Summary: ${summary}` });
  memory.push({ role: 'bot', content: `${reply} | Summary: ${summary}` });

  return reply;
}
