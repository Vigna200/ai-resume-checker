
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Mail, 
  Star, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from "lucide-react";
import { CandidateModal } from "./CandidateModal";

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

interface CandidatesListProps {
  candidates: Candidate[];
  setCandidates: (candidates: Candidate[]) => void;
}

export const CandidatesList = ({ candidates, setCandidates }: CandidatesListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [sortBy, setSortBy] = useState("score");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shortlisted":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "reviewing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const updateCandidateStatus = (candidateId: number, newStatus: string) => {
    setCandidates(
      candidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, status: newStatus }
          : candidate
      )
    );
  };

  const filteredAndSortedCandidates = candidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || candidate.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score;
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Candidates ({candidates.length})</CardTitle>
          <CardDescription>
            Manage and review all screened candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{candidate.name}</CardTitle>
                  <CardDescription>{candidate.position}</CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(candidate.status)}
                  <span className={`text-2xl font-bold ${getScoreColor(candidate.score)}`}>
                    {candidate.score}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Badge */}
              <Badge className={getStatusColor(candidate.status)}>
                {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
              </Badge>

              {/* Contact Info */}
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{candidate.email}</p>
                <p className="text-sm text-gray-600">{candidate.experience} experience</p>
                <p className="text-sm text-gray-600">Uploaded: {candidate.uploadDate}</p>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm font-medium mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{candidate.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCandidate(candidate)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`mailto:${candidate.email}`)}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              {/* Status Actions */}
              <div className="flex space-x-2">
                {candidate.status !== "shortlisted" && (
                  <Button
                    size="sm"
                    onClick={() => updateCandidateStatus(candidate.id, "shortlisted")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Shortlist
                  </Button>
                )}
                {candidate.status !== "rejected" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateCandidateStatus(candidate.id, "rejected")}
                    className="flex-1"
                  >
                    Reject
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedCandidates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">No candidates found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onStatusUpdate={(newStatus) => {
            updateCandidateStatus(selectedCandidate.id, newStatus);
            setSelectedCandidate({ ...selectedCandidate, status: newStatus });
          }}
        />
      )}
    </div>
  );
};
