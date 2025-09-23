import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";



export const getInternshipDetail = async ({ id }) => {
  const res = await getDoc(doc(db, `internships/${id}`));
  if (await res.exists()) {
    return res.data();
  } else {
    return null;
  }
};