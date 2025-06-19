
import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ResumeUploadProps {
  onAnalysisComplete: (result: any) => void;
}

export const ResumeUpload = ({ onAnalysisComplete }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [position, setPosition] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || 
          droppedFile.type === "application/msword" || 
          droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(droppedFile);
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Please upload a PDF or Word document.");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success("Resume uploaded successfully!");
    }
  };

  const simulateAIAnalysis = (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockAnalysis = {
          name: `Candidate ${Math.floor(Math.random() * 1000)}`,
          email: `candidate${Math.floor(Math.random() * 1000)}@email.com`,
          position: position || "Software Developer",
          score: Math.floor(Math.random() * 30) + 70, // Score between 70-100
          skills: ["JavaScript", "React", "Node.js", "Python", "SQL"].slice(0, Math.floor(Math.random() * 3) + 2),
          experience: `${Math.floor(Math.random() * 8) + 1} years`,
          strengths: [
            "Strong technical background",
            "Excellent communication skills",
            "Relevant project experience"
          ],
          improvements: [
            "Could benefit from more leadership experience",
            "Consider additional certifications"
          ]
        };
        resolve(mockAnalysis);
      }, 3000);
    });
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }

    if (!jobDescription) {
      toast.error("Please enter a job description.");
      return;
    }

    setAnalyzing(true);
    try {
      const result = await simulateAIAnalysis();
      onAnalysisComplete(result);
      setAnalysisComplete(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFile(null);
        setJobDescription("");
        setPosition("");
        setAnalysisComplete(false);
      }, 2000);
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
          <CardDescription>
            Upload a candidate's resume and provide job details for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Resume File</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              
              {file ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-6 w-6 text-green-600" />
                  <span className="text-green-600 font-medium">{file.name}</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drop your resume here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, DOC, and DOCX files
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Position Title */}
          <div className="space-y-2">
            <Label htmlFor="position">Position Title</Label>
            <Input
              id="position"
              placeholder="e.g., Senior Frontend Developer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <textarea
              id="job-description"
              className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Paste the job description here. Include required skills, experience level, and key responsibilities..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <Button
            onClick={handleAnalyze}
            disabled={analyzing || !file || !jobDescription}
            className="w-full"
            size="lg"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Resume...
              </>
            ) : analysisComplete ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Analysis Complete!
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Sample Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Job Description</CardTitle>
          <CardDescription>
            You can use this sample or enter your own job description above
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Senior Frontend Developer</strong><br />
              We are looking for an experienced Frontend Developer with 3+ years of experience in React, TypeScript, and modern web technologies. The ideal candidate should have experience with state management (Redux/Zustand), testing frameworks (Jest, React Testing Library), and CSS frameworks (Tailwind CSS). Experience with Next.js, GraphQL, and cloud platforms is a plus. Strong problem-solving skills and ability to work in an agile environment are essential.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => setJobDescription("We are looking for an experienced Frontend Developer with 3+ years of experience in React, TypeScript, and modern web technologies. The ideal candidate should have experience with state management (Redux/Zustand), testing frameworks (Jest, React Testing Library), and CSS frameworks (Tailwind CSS). Experience with Next.js, GraphQL, and cloud platforms is a plus. Strong problem-solving skills and ability to work in an agile environment are essential.")}
            >
              Use This Sample
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
