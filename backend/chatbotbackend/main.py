import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.memory import ConversationBufferMemory
from pymongo import MongoClient
from bson.json_util import dumps

app = FastAPI()

ALLOWED_COLLECTIONS = {"discussions"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Load environment variables
load_dotenv()

# Initialize MongoDB connection
mongo_uri = os.getenv("DATABASE_URI")
mongo_client = MongoClient(mongo_uri)

db = mongo_client[os.getenv("DB_NAME")]


# Initialize conversation memory
memory = ConversationBufferMemory(return_messages=True)

def initialize_gemini():
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY is not set in the environment variables.")
    genai.configure(api_key=gemini_api_key)

    generation_config = {
        "temperature": 0.7,
        "top_p": 0.9,
        "top_k": 40,
        "max_output_tokens": 4096,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    return model

def summarize_conversation(user_message: str, bot_response: str, model) -> str:
    summary_prompt = f"""Please provide a brief summary of this conversation exchange:
    User: {user_message}
    Bot: {bot_response}
    
    Summarize the key points in 1-2 sentences."""

    summary_response = model.generate_content(summary_prompt)
    return summary_response.text

ALLOWED_COLLECTIONS = {"discussions"}

def get_mongo_schema():
    schema = {}

    for collection_name in ALLOWED_COLLECTIONS:
        sample_doc = db[collection_name].find_one()
        if sample_doc:
            schema[collection_name] = list(sample_doc.keys())
        else:
            schema[collection_name] = ["No documents in this collection"]

    return schema


def execute_mongo_query(database, collection: str, query: str):
    try:
        query = eval(query)

        if collection not in ALLOWED_COLLECTIONS:
            return {"error": f"Invalid collection name: {collection}. Allowed collections: {list(ALLOWED_COLLECTIONS)}"}

        if not isinstance(query, list):
            return {"error": "Query must be a list of dictionaries (valid MongoDB aggregation pipeline)"}

        try:
            col = database[collection]
            cursor = col.aggregate(query)  # Ensure query is passed correctly
            return {collection: list(cursor)}
        except Exception as e:
            return {collection: f"Error executing query: {str(e)}"}
    except Exception as e:
        return {"error": f"Error executing MongoDB query: {str(e)}"}

def chat_with_llm(user_message: str):
    model = initialize_gemini()
    chat_session = model.start_chat()
    
    schema = get_mongo_schema()
    print(schema)
    
    try:
        history = memory.load_memory_variables({})
        history_context = "\n".join([f"{m.type}: {m.content}" for m in history.get("history", [])])
        
        context = f"""Based on this MongoDB schema:
        {schema}
        
        Previous conversation:
        {history_context}
        
        Generate only a MongoDB  query as aggregation pipeline to answer this question: {user_message}
        Return only the which collection to run aggregation pipeline query in first line 
        and mongodb aggregation pipeline input in second line onwards
        without any markdown formatting or explanations.
        when writing the aggregation pipeline query, keep in mind that in aggregation pipeline, you are only allowed to read data from the database,
        you are not allowed to write to the database.
        I use python syntax. so dont send null, send None"""
        
        response = chat_session.send_message(context)
        mongo_query = response.text.strip()

        print(mongo_query)

        first_line, rest_lines = mongo_query.split("\n", 1) if "\n" in mongo_query else (mongo_query, "")

        query_results = execute_mongo_query(db, first_line, rest_lines)

        print(f"Query results: {query_results}")
        
        if any(query_results.values()):
            results_context = f"""Based on this MongoDB query result:
            {dumps(query_results)}
            
            Previous conversation:
            {history_context}
            
            You are a friendly customer service chatbot botX for The GuidlineX app.
            You are Carrie, an interactive guide chat application designed to bridge the gap between individuals seeking guidance and experts with the knowledge to assist them. 
            The platform provides structured forums where users can post problems related to industry, education, jobs, and academic topics. 
            Experts and knowledgeable individuals can respond, and the community can give feedback and ratings. 
            The system ensures accurate information through verified resource persons, facilitating structured knowledge-sharing and expert connections.
            Please provide a natural, conversational response to this question: {user_message}
            
            Guidelines:
            - Use the query results to provide accurate information
            - Maintain a helpful and professional tone
            - Only share publicly available information
            - Do not reveal any sensitive data like personal details or internal records
            - Keep the conversation engaging and suggest relevant follow-up topics
            - Do not reveal points of players to users
            - Format numbers and dates in a user-friendly way
            - try to give brief and concise answers - but with enough details to help users understand what they need to know
            - if you don't know the answer, say 'I don’t have enough knowledge to answer that question.
            - give values in rupees' """
        else:
            results_context = f"""You are a helpful and friendly customer service chatbot botX for The GuidlineX app.
            Even though I don't have specific database information for this query, please:
            1. Maintain a natural, conversational tone
            2. Acknowledge the user's question
            3. Suggest alternative topics or questions if appropriate
            4. Express willingness to help with other questions
            
             - if you don't know the answer, say 'I don’t have enough knowledge to answer that question.'
            
            Previous conversation:
            {history_context}
            
            The user's question is: {user_message}
            
            Remember to be empathetic, professional, and focus only on publicly available information."""
        
        final_response = chat_session.send_message(results_context)
        conversation_summary = summarize_conversation(user_message, final_response.text, model)
        
        memory.save_context(
            {"input": f"{user_message}\nSummary: {conversation_summary}"}, 
            {"output": f"{final_response.text}\nSummary: {conversation_summary}"}
        )
        
        return final_response.text
        
    except Exception as e:
        raise Exception(f"Error in chat processing: {str(e)}")

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        print(f"Received message: {request.message}")
        response = chat_with_llm(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        print(f"Error in chat_endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
