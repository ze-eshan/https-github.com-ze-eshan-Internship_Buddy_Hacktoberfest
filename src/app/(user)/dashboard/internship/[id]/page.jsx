"use client"
import { getInternshipDetail } from '@/firebase/internship/read';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Users, 
  FileText,
  ExternalLink
} from 'lucide-react';

const InternshipDetailPage = () => {
  const id = useParams().id;
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getInternshipDetail({ id });
        setInternship(res);
      } catch (error) {
        console.error("Error fetching internship:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-primary"></div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold">Internship not found</h2>
        <p className="text-muted-foreground mt-2">The requested internship details could not be loaded</p>
      </div>
    );
  }

  const {
    jobTitle,
    company,
    locationAndType,
    duration,
    eligibility,
    qualifications,
    responsibilities,
    compensation,
    application
  } = internship;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">
          <Briefcase className="mr-1 h-3 w-3" />
          Internship
        </Badge>
        <h1 className="text-3xl font-bold">{jobTitle}</h1>
        <div className="flex items-center mt-2 text-muted-foreground">
          <GraduationCap className="mr-2 h-4 w-4" />
          <span>{company?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {company?.overview}
              </p>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2">
                {responsibilities?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-theme-primary/10 p-1 rounded-full mr-2 mt-1">
                      <div className="w-1.5 h-1.5 bg-theme-primary rounded-full"></div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle>Qualifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Education</h3>
                <p className="text-muted-foreground">{qualifications?.education}</p>
              </div>

              {qualifications?.requiredSkills && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {qualifications.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {qualifications?.preferredSkills && (
                <div>
                  <h3 className="font-medium mb-2">Preferred Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {qualifications.preferredSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{locationAndType?.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">
                    {duration?.length || 'Program-based'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Start Date</p>
                  <p className="text-muted-foreground">
                    {duration?.startDate || 'To be determined'}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {locationAndType?.tools?.map((tool, index) => (
                    <Badge key={index} variant="outline">{tool}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {compensation?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-theme-primary/10 p-1 rounded-full mr-2 mt-1">
                      <div className="w-1.5 h-1.5 bg-theme-primary rounded-full"></div>
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Card */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {eligibility?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Users className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Apply Button */}
          <Button className="w-full" size="lg">
            <FileText className="mr-2 h-4 w-4" />
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailPage;