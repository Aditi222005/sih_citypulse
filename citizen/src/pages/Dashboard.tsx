import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Construction, 
  Droplets, 
  Zap, 
  Trash2, 
  ShieldCheck,
  Plus,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Hourglass,
  ThumbsUp
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/citypulse-hero.jpg"; 

const Dashboard = () => {
  const issueCategories = [
    { 
      name: "Roads & Potholes", 
      icon: Construction, 
      count: 23, 
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwbtBVf1v2HOHMqqH6ITta3f-brOdGYZNig&s" // --- UPDATED ---
    },
    { 
      name: "Water Supply", 
      icon: Droplets, 
      count: 12, 
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Rr4q3Spx_6pu8_9p_DKN5KSRu9fSehxLpw&s" // --- UPDATED ---
    },
    { 
      name: "Electricity", 
      icon: Zap, 
      count: 8, 
      imageUrl: "https://images.unsplash.com/photo-1487875961445-47a00398c267?w=800"
    },
    { 
      name: "Sanitation", 
      icon: ShieldCheck, 
      count: 15, 
      imageUrl: "https://images.indianexpress.com/2025/01/mustafabad-drain.jpg?w=414" // --- UPDATED ---
    },
    { 
      name: "Garbage", 
      icon: Trash2, 
      count: 19, 
      imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800"
    },
  ];

  const activeIssues = [
    {
      id: "CP001",
      title: "Deep Pothole on Main Street",
      description: "A large pothole near the intersection is causing traffic issues and potential vehicle damage.",
      status: "In Progress",
      progress: 65,
      location: "Main St & 5th Ave",
      date: "2025-09-15",
    },
    {
      id: "CP003",
      title: "Community Park Fountain Broken",
      description: "The main water fountain in Central Park has been out of service for over a week.",
      status: "Resolved",
      progress: 100,
      location: "Central Park",
      date: "2025-09-10",
    },
    {
      id: "CP004",
      title: "Streetlight Outage on Oak Ave",
      description: "Multiple streetlights are not working on the 400 block of Oak Avenue, creating a safety concern.",
      status: "Received",
      progress: 15,
      location: "421 Oak Avenue",
      date: "2025-09-22",
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "In Progress":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-amber-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              Welcome to CityPulse
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Your voice matters. Report municipal issues, track progress, and help build a better community together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6 shadow-lg">
                <Link to="/report">
                  <Plus className="mr-2 h-5 w-5" />
                  Report New Issue
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20">
                <Link to="/track">
                  <MapPin className="mr-2 h-5 w-5" />
                  Track Issues
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Issue Categories with Images */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Report by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {issueCategories.map((category) => (
              <Link key={category.name} to={`/report?category=${category.name.toLowerCase()}`}>
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <img src={category.imageUrl} alt={category.name} className="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-md text-slate-800">{category.name}</h3>
                    <Badge variant="secondary" className="mt-2">
                      {category.count} active issues
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20 bg-white rounded-lg p-10 shadow-md">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 rounded-full p-4 mb-4">
                <FileText className="h-8 w-8 text-amber-600"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Submit a Report</h3>
              <p className="text-slate-500">Quickly report an issue using our simple form, with photos and location.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 rounded-full p-4 mb-4">
                <Hourglass className="h-8 w-8 text-amber-600"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. We Acknowledge</h3>
              <p className="text-slate-500">Your report is received, reviewed, and assigned to the correct department.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 rounded-full p-4 mb-4">
                <ThumbsUp className="h-8 w-8 text-amber-600"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. See It Resolved</h3>
              <p className="text-slate-500">Track the progress in real-time and get notified upon resolution.</p>
            </div>
          </div>
        </div>

        {/* Active Issues Overview */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Your Active Issues</h2>
            <Button asChild variant="outline">
              <Link to="/track">View All</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeIssues.map((issue) => (
              <Card key={issue.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-800">{issue.title}</CardTitle>
                      <p className="text-sm text-slate-400 mt-1">#{issue.id}</p>
                    </div>
                    {getStatusIcon(issue.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4 text-sm">{issue.description}</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Progress:</span>
                        <span className="font-medium text-amber-600">{issue.progress}%</span>
                      </div>
                      <Progress value={issue.progress} className="h-2" />
                    </div>
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                        <div className="flex items-center text-sm text-slate-500">
                           <Badge variant="outline" className={`${
                             issue.status === 'Resolved' ? 'border-green-300 bg-green-50 text-green-700' :
                             issue.status === 'In Progress' ? 'border-amber-300 bg-amber-50 text-amber-700' :
                             'border-slate-300 bg-slate-50 text-slate-700'
                           }`}>
                             {issue.status}
                           </Badge>
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{issue.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Reported: {new Date(issue.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Story */}
        <div className="mb-16">
           <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Success Story</h2>
            <Card className="bg-white overflow-hidden md:grid md:grid-cols-2 items-center shadow-lg">
                <div className="p-8">
                   <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
                   <h3 className="text-2xl font-bold text-slate-800 mt-4">Park Fountain Restored!</h3>
                   <p className="text-slate-600 mt-2">Thanks to a citizen report, the beloved fountain in Central Park is now fully operational, just in time for summer.</p>
                   <p className="text-sm text-slate-400 mt-4">Reported on September 10, 2025. Resolved on September 19, 2025.</p>
                   <Button asChild variant="link" className="p-0 mt-4 text-amber-600">
                       <Link to="/track/CP003">View Detailss &rarr;</Link>
                   </Button>
                </div>
                <div className="h-64 md:h-full">
                    <img src="https://5.imimg.com/data5/UA/ED/JN/SELLER-11452613/outdoor-park-water-fountain.jpg" alt="Restored park fountain" className="w-full h-full object-cover" />
                </div>
            </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;