import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY, // set in .env
});



const pc_index = pc.index(process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME); 

export default pc_index;