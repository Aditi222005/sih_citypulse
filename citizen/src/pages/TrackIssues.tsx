import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Search,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Filter,
  Calendar
} from "lucide-react";

const TrackIssues = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const issues = [
    {
      id: "CP001",
      title: "Pothole on Main Street causing traffic disruption",
      category: "Roads",
      status: "In Progress",
      progress: 65,
      location: "Main St & 5th Ave",
      date: "2024-01-15",
      estimatedCompletion: "2024-01-25",
      department: "Public Works",
      priority: "High",
      description: "Large pothole affecting both lanes of traffic. Temporary barriers have been placed.",
      updates: [
        { date: "2024-01-20", status: "Work crew assigned", progress: 65 },
        { date: "2024-01-18", status: "Materials ordered", progress: 40 },
        { date: "2024-01-15", status: "Issue reported and verified", progress: 20 }
      ]
    },
    {
      id: "CP002", 
      title: "Water leak near Central Park entrance",
      category: "Water",
      status: "Received",
      progress: 25,
      location: "Central Park Area, Near Gate 3",
      date: "2024-01-18",
      estimatedCompletion: "2024-01-28",
      department: "Water Department",
      priority: "Medium",
      description: "Underground water leak causing pooling on sidewalk.",
      updates: [
        { date: "2024-01-19", status: "Investigation scheduled", progress: 25 },
        { date: "2024-01-18", status: "Issue reported", progress: 10 }
      ]
    },
    {
      id: "CP003",
      title: "Missed garbage collection on Oak Street",
      category: "Garbage", 
      status: "Resolved",
      progress: 100,
      location: "Oak Street, Block 200-300",
      date: "2024-01-10",
      estimatedCompletion: "2024-01-12",
      department: "Sanitation",
      priority: "Low",
      description: "Scheduled pickup was missed due to truck breakdown.",
      updates: [
        { date: "2024-01-12", status: "Collection completed", progress: 100 },
        { date: "2024-01-11", status: "Special pickup scheduled", progress: 75 },
        { date: "2024-01-10", status: "Issue reported", progress: 25 }
      ]
    },
    {
      id: "CP004",
      title: "Street light not working on Elm Avenue",
      category: "Electricity", 
      status: "In Progress",
      progress: 80,
      location: "Elm Avenue & 2nd Street",
      date: "2024-01-12",
      estimatedCompletion: "2024-01-22",
      department: "Electrical Services",
      priority: "Medium",
      description: "Street light pole #445 not functioning, affecting nighttime visibility.",
      updates: [
        { date: "2024-01-21", status: "New fixture installed", progress: 80 },
        { date: "2024-01-19", status: "Electrical fault identified", progress: 60 },
        { date: "2024-01-14", status: "Inspection completed", progress: 40 },
        { date: "2024-01-12", status: "Issue reported", progress: 20 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-secondary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Track Your Issues</h1>
          <p className="text-lg text-muted-foreground">
            Monitor the progress of your reported issues and see real-time updates from city departments.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by issue ID, title, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="municipal-card">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-primary">
                        {issue.title}
                      </CardTitle>
                      {getStatusIcon(issue.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">#{issue.id}</span>
                      <span>•</span>
                      <Badge variant="outline">{issue.category}</Badge>
                      <span>•</span>
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority} Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Progress and Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <p className="text-muted-foreground">{issue.description}</p>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{issue.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Est. completion: {new Date(issue.estimatedCompletion).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-primary font-semibold">{issue.progress}%</span>
                      </div>
                      <Progress value={issue.progress} className="h-3" />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold mb-3 text-primary">Recent Updates</h4>
                    <div className="space-y-3">
                      {issue.updates.slice(0, 3).map((update, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-secondary rounded-full mt-2"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {update.status}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(update.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No issues found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "You haven't reported any issues yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackIssues;