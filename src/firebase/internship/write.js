import { doc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config";

export const insertInternship = async ({ internshipData }) => {
  const uid = uuidv4(); // generate unique UUID
  await setDoc(doc(db, `internships/${uid}`), {
    id: uid,
    ...internshipData,
    createdAt: Timestamp.now(),
  });
};
