
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  TrendingUp, 
  Award,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  score: number;
  skills: string[];
  experience: string;
  status: string;
  uploadDate: string;
}

interface CandidateModalProps {
  candidate: Candidate;
  onClose: () => void;
  onStatusUpdate: (newStatus: string) => void;
}

export const CandidateModal = ({ candidate, onClose, onStatusUpdate }: CandidateModalProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const mockDetailedAnalysis = {
    contact: {
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe"
    },
    summary: "Experienced software developer with a strong background in modern web technologies and a passion for creating efficient, scalable solutions.",
    workExperience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Corp",
        duration: "2021 - Present",
        description: "Led development of React applications, mentored junior developers, improved performance by 40%"
      },
      {
        title: "Frontend Developer",
        company: "StartupXYZ",
        duration: "2019 - 2021",
        description: "Built responsive web applications using React and TypeScript, collaborated with design team"
      }
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        school: "University of Technology",
        year: "2019"
      }
    ],
    strengths: [
      "Strong technical foundation in modern frameworks",
      "Excellent problem-solving abilities",
      "Great communication and teamwork skills",
      "Experience with agile methodologies"
    ],
    improvements: [
      "Could benefit from more backend experience",
      "Consider obtaining cloud certifications",
      "Leadership experience could be expanded"
    ],
    skillsAnalysis: {
      technical: 92,
      communication: 87,
      leadership: 75,
      experience: 89
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold">{candidate.name}</h2>
              <p className="text-gray-600">{candidate.position}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getScoreColor(candidate.score)}`}>
                {candidate.score}%
              </div>
              <p className="text-sm text-gray-500">Match Score</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{mockDetailedAnalysis.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{mockDetailedAnalysis.contact.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Uploaded: {candidate.uploadDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(mockDetailedAnalysis.skillsAnalysis).map(([skill, score]) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize font-medium">{skill}</span>
                      <span className="font-bold">{score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockDetailedAnalysis.workExperience.map((job, index) => (
                <div key={index} className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-semibold">{job.title}</h4>
                  <p className="text-gray-600">{job.company} • {job.duration}</p>
                  <p className="text-sm mt-1">{job.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockDetailedAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockDetailedAnalysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button
              onClick={() => onStatusUpdate("shortlisted")}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={candidate.status === "shortlisted"}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Shortlist Candidate
            </Button>
            <Button
              onClick={() => window.open(`mailto:${candidate.email}`)}
              variant="outline"
              className="flex-1"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button
              onClick={() => onStatusUpdate("rejected")}
              variant="destructive"
              className="flex-1"
              disabled={candidate.status === "rejected"}
            >
              Reject Candidate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
