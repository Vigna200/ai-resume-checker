
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Users, TrendingUp, CheckCircle } from "lucide-react";
import { ResumeUpload } from "@/components/resume/ResumeUpload";
import { CandidatesList } from "@/components/candidates/CandidatesList";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      position: "Frontend Developer",
      score: 92,
      skills: ["React", "TypeScript", "CSS"],
      experience: "5 years",
      status: "shortlisted",
      uploadDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      position: "Full Stack Developer",
      score: 87,
      skills: ["Node.js", "Python", "PostgreSQL"],
      experience: "3 years",
      status: "reviewing",
      uploadDate: "2024-01-14"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      position: "UI/UX Designer",
      score: 78,
      skills: ["Figma", "Adobe Creative Suite", "User Research"],
      experience: "4 years",
      status: "pending",
      uploadDate: "2024-01-13"
    }
  ]);

  const handleResumeAnalyzed = (analysisResult: any) => {
    const newCandidate = {
      id: Date.now(),
      name: analysisResult.name,
      email: analysisResult.email,
      position: analysisResult.position,
      score: analysisResult.score,
      skills: analysisResult.skills,
      experience: analysisResult.experience,
      status: "pending",
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    setCandidates(prev => [newCandidate, ...prev]);
    toast.success("Resume analyzed successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <ResumeUpload onAnalysisComplete={handleResumeAnalyzed} />;
      case "candidates":
        return <CandidatesList candidates={candidates} setCandidates={setCandidates} />;
      case "analytics":
        return <AnalyticsOverview candidates={candidates} />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{candidates.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {candidates.filter(c => c.status === "shortlisted").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    High quality candidates
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(candidates.reduce((acc, c) => acc + c.score, 0) / candidates.length)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Currently hiring
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest resume submissions and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidates.slice(0, 3).map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.position}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{candidate.score}%</p>
                          <p className="text-xs text-muted-foreground">{candidate.uploadDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab("upload")} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Resume
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("candidates")} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View All Candidates
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("analytics")} 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ResumeAI</h1>
                <p className="text-sm text-gray-500">AI-Powered Resume Screening</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "upload", label: "Upload Resume" },
              { id: "candidates", label: "Candidates" },
              { id: "analytics", label: "Analytics" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
