
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, Users, Award, Target } from "lucide-react";

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

interface AnalyticsOverviewProps {
  candidates: Candidate[];
}

export const AnalyticsOverview = ({ candidates }: AnalyticsOverviewProps) => {
  // Calculate analytics data
  const totalCandidates = candidates.length;
  const shortlistedCandidates = candidates.filter(c => c.status === "shortlisted").length;
  const averageScore = candidates.length > 0 
    ? Math.round(candidates.reduce((acc, c) => acc + c.score, 0) / candidates.length)
    : 0;
  const rejectionRate = candidates.length > 0 
    ? Math.round((candidates.filter(c => c.status === "rejected").length / candidates.length) * 100)
    : 0;

  // Score distribution data
  const scoreDistribution = [
    { range: "90-100", count: candidates.filter(c => c.score >= 90).length },
    { range: "80-89", count: candidates.filter(c => c.score >= 80 && c.score < 90).length },
    { range: "70-79", count: candidates.filter(c => c.score >= 70 && c.score < 80).length },
    { range: "60-69", count: candidates.filter(c => c.score >= 60 && c.score < 70).length },
    { range: "Below 60", count: candidates.filter(c => c.score < 60).length },
  ];

  // Status distribution data
  const statusData = [
    { name: "Shortlisted", value: candidates.filter(c => c.status === "shortlisted").length, color: "#10b981" },
    { name: "Reviewing", value: candidates.filter(c => c.status === "reviewing").length, color: "#f59e0b" },
    { name: "Pending", value: candidates.filter(c => c.status === "pending").length, color: "#6b7280" },
    { name: "Rejected", value: candidates.filter(c => c.status === "rejected").length, color: "#ef4444" },
  ];

  // Top skills analysis
  const skillsCount: { [key: string]: number } = {};
  candidates.forEach(candidate => {
    candidate.skills.forEach(skill => {
      skillsCount[skill] = (skillsCount[skill] || 0) + 1;
    });
  });

  const topSkills = Object.entries(skillsCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  // Monthly trend (mock data for demonstration)
  const monthlyTrend = [
    { month: "Jan", candidates: 8, shortlisted: 3 },
    { month: "Feb", candidates: 12, shortlisted: 5 },
    { month: "Mar", candidates: 15, shortlisted: 7 },
    { month: "Apr", candidates: 10, shortlisted: 4 },
    { month: "May", candidates: 18, shortlisted: 8 },
    { month: "Jun", candidates: totalCandidates, shortlisted: shortlistedCandidates },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCandidates}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shortlistedCandidates}</div>
            <p className="text-xs text-muted-foreground">
              {totalCandidates > 0 ? Math.round((shortlistedCandidates / totalCandidates) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectionRate}%</div>
            <p className="text-xs text-muted-foreground">
              -3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Distribution of candidate scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Status</CardTitle>
            <CardDescription>Current status of all candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Candidates and shortlisted over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="candidates" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="shortlisted" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
            <CardDescription>Most frequently mentioned skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSkills.map((item, index) => (
                <div key={item.skill} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="font-medium">{item.skill}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(item.count / totalCandidates) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
          <CardDescription>AI-generated insights based on your screening data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">High-Quality Pool</h4>
              <p className="text-sm text-blue-700">
                {Math.round((candidates.filter(c => c.score >= 80).length / totalCandidates) * 100)}% of candidates scored above 80%, indicating strong talent pipeline.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Popular Skills</h4>
              <p className="text-sm text-green-700">
                React and JavaScript are the most common skills, appearing in {Math.round((topSkills.find(s => s.skill === 'React')?.count || 0) / totalCandidates * 100)}% of resumes.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Optimization Tip</h4>
              <p className="text-sm text-orange-700">
                Consider adjusting scoring criteria based on the {rejectionRate}% rejection rate to optimize candidate selection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
