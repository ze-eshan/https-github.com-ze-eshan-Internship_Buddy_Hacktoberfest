"use client";
import { getResumeEmbedding } from "@/firebase/users/read";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Lightbulb } from 'lucide-react'
import InternshipSuggestionCard from "@/components/InternshipSuggestionCard";
import Loading from "@/app/loading";


const InternshipSuggestions = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const resumeEmbedding = await getResumeEmbedding({ uid: user.uid });
      if (!resumeEmbedding) {
        throw new Error("No resume embedding found for this user");
      }

      const searchRes = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeddings: resumeEmbedding,
          topK: 5,
        }),
      });

      if (!searchRes.ok) {
        const errText = await searchRes.text();
        throw new Error(`Search API failed: ${errText}`);
      }

      const data = await searchRes.json();
      setSuggestions(data.results || []);
    } catch (err) {
      console.error("❌ Internship suggestion error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchSuggestions();
    }
  }, [user]);

  if (!user?.uid) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Alert variant="default">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              Please log in to see personalized internship suggestions
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Internships</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
          <Loading/>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error: {error}
            </AlertDescription>
          </Alert>
        )}

        {!loading && !error && suggestions.length === 0 && (
          <Loading/>
        )}

        {!loading && !error && suggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <InternshipSuggestionCard 
                key={suggestion.id} 
                id={suggestion.internship_id} 
                score={suggestion.score.toFixed(3)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InternshipSuggestions;