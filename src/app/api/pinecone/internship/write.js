import { v4 as uuidv4 } from "uuid";
import pc_index from "../client";
export const insertInternshipEmbedings = async (embbedings, internship_id) => {
  const id = uuidv4();
  await pc_index.upsert([
    {
      id,
      values: embbedings,
      metadata: { internship_id },
    },
  ]);
  console.log(`Stored embedding for ID: ${id}`);
};
