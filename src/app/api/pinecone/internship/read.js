import pc_index from "../client";

/**
 * Search internships in Pinecone using user resume embeddings
 * @param {Array<number>} resumeEmbeddings - The embedding vector of the user's resume
 * @param {number} topK - Number of similar results to return
 */
export const searchInternships = async (resumeEmbeddings, topK = 5) => {
  try {
    const queryResponse = await pc_index.query({
      vector: resumeEmbeddings,
      topK: topK,
      includeMetadata: true,  // ✅ To get back internship_id
    });

    console.log("🔍 Query results:", JSON.stringify(queryResponse, null, 2));

    return queryResponse.matches.map(match => ({
      id: match.id,
      score: match.score,               // similarity score
      internship_id: match.metadata?.internship_id, // stored metadata
    }));
  } catch (error) {
    console.error("❌ Error querying Pinecone:", error);
    throw error;
  }
};
