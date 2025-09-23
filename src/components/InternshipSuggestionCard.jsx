"use client"
import { getInternshipDetail } from '@/firebase/internship/read'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Users, Building } from 'lucide-react'
import Link from 'next/link'
import Loading from '@/app/loading'

const InternshipSuggestionCard = ({ id,score }) => {
  const [internship, setInternship] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true)
        const res = await getInternshipDetail({ id })
        setInternship(res)
      } catch (err) {
        setError(err.message)
        console.error("Error fetching internship:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchInternship()
    }
  }, [id])

  if (loading) {
    return (
      <Loading/>
    )
  }

  if (error || !internship) {
    return (
      <Card className="w-full border border-red-200 bg-red-50/50 overflow-hidden">
        <CardContent className="p-4 text-center">
          <p className="text-red-500 font-medium">Failed to load internship</p>
        </CardContent>
      </Card>
    )
  }

  const { jobTitle, company, locationAndType, duration } = internship

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg border-theme-primary/20 hover:border-theme-primary/40">
      <div className="bg-theme-primary/5 p-4 border-b border-theme-primary/10">
        <CardTitle className="text-lg line-clamp-2 leading-tight flex justify-between">
          <div>
            {jobTitle}
          </div>
         <div>
             Match {score}
         </div>
        </CardTitle>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start mb-3">
          <div className="bg-theme-primary/10 p-2 rounded-lg mr-3">
            <Building className="h-5 w-5 text-theme-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm line-clamp-1">{company?.name}</h3>
            <p className="text-xs text-muted-foreground">Company</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant="secondary" 
            className="flex items-center bg-theme-primary/10 text-theme-primary hover:bg-theme-primary/20"
          >
            <MapPin className="mr-1 h-3 w-3" />
            <span className="text-xs">{locationAndType?.location || 'Not specified'}</span>
          </Badge>
          <Badge 
            variant="outline" 
            className="flex items-center border-theme-primary/30 text-theme-primary"
          >
            <Clock className="mr-1 h-3 w-3" />
            <span className="text-xs">{duration?.length || 'Program-based'}</span>
          </Badge>
        </div>
        
        <Button 
          asChild 
          size="sm" 
          className="w-full bg-theme-primary hover:bg-theme-primary/90 text-white"
        >
          <Link href={`/dashboard/internship/${id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default InternshipSuggestionCard