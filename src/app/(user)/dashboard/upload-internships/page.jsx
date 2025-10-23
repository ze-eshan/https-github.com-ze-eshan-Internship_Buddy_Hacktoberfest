"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { insertUserResume } from "@/firebase/users/write";
import { generateDigitalResume } from "@/model/resumeExtractorModel";
import { Loader, Settings, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateDigitalInternship } from "@/model/intershipExtractorModel";
import { insertInternship } from "@/firebase/internship/write";

// import { Button } from "../ui/button";

export default function ResumeUploader() {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const user = useSelector((state) => state.user);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only PDF and DOCX are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setError(null);
    setResume(file);
  };
  const handleUpload = async () => {
    if (!resume) {
      setError("Please upload an internship doc.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      setStatus("Processing internship document...");

      // Step 1: Upload resume to extract text
      const formData = new FormData();
      formData.append("resume", resume);

      const response = await fetch(
        "https://forge-ai-api.vercel.app/api/resumetext",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload resume");
      }

      const result = await response.json();
      setStatus("Internship text extracted successfully");
      const textInternship = JSON.stringify(result.text);
      console.log("📄 Extracted Internship Text:", textInternship);

   
      

      // Step 3: Generate digital internship JSON
      setStatus("Generating digital internship...");
      const digitalInternshipStr = await generateDigitalInternship(
        textInternship
      );
      const internshipData = JSON.parse(digitalInternshipStr);
      console.log("📝 Digital Internship Data:", internshipData);

      // Step 4: Insert internship into Firestore
      const fb_res = await insertInternship({ internshipData });
      if (!fb_res?.msg) {
        throw new Error("Error inserting data in Firebase");
      }
      console.log("🆔 Firebase Internship ID:", fb_res.id);



      setStatus("Generating embeddings...");
      const embeddingReqData = { text: JSON.stringify(internshipData) };

      const embedding_res = await fetch(
        process.env.NEXT_PUBLIC_EMBEDING_MODEL_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(embeddingReqData),
        }
      );

      if (!embedding_res.ok) {
        throw new Error(
          `Failed to generate embeddings: ${embedding_res.status} ${embedding_res.statusText}`
        );
      }

      const embeddingData = await embedding_res.json();
      console.log("✅ Embedding Data:", embeddingData);

      const apiResponse = await fetch("/api/internship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          embeddings: embeddingData.embedding,
          internship_id: fb_res.id,
        }),
      });

      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        throw new Error(
          `Failed to store embeddings: ${apiResponse.status} ${errText}`
        );
      }

      const apiResult = await apiResponse.json();
      if (!apiResult.success) {
        throw new Error(`Failed to store embeddings: ${apiResult.error}`);
      }

      setStatus("Generated successfully ✅");
      toast.success("Internship data updated successfully");
    } catch (error) {
      console.error("Error in handleUpload:", error);
      setError(`Error: ${error.message}`);
      setStatus("Failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto max-w-7xl mt-6 grid grid-cols-1 gap-4">
      {/* Upload Resume Section */}
      <div className="bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Upload Internship Doc
        </h2>
        <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 p-10 text-center rounded-lg">
          <input
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PDF, DOCX (MAX. 5MB)
            </p>
          </label>
          {resume && (
            <p className="text-green-600 dark:text-green-400 mt-2">
              {resume.name} Selected
            </p>
          )}
        </div>

        {/* {status && (
          <div className="p-1 text-green-400 flex justify-center ">
            
            {isLoading && <Settings className="animate-spin" />} {status}
          </div>
        )} */}
        <Button
          disabled={isLoading}
          onClick={handleUpload}
          className="mt-4 w-full cursor-pointer bg-theme-primary hover:bg-theme-primary/[0.7] text-white py-2 rounded-lg "
        >
          {isLoading ? <Loader className="animate-spin" /> : <UploadCloud />}
          {isLoading ? status : "Upload Doc"}
        </Button>
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-center mt-4">
          {error}
        </p>
      )}
    </div>
  );
}
