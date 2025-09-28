import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare,
  ThumbsUp,
  Users,
  Award,
  TrendingUp,
  Plus,
  Send,
  MapPin,
  Calendar
} from "lucide-react";

const Community = () => {
  const [newPostContent, setNewPostContent] = useState("");

  const communityStats = [
    { label: "Active Members", value: "2,847", icon: Users, color: "text-primary" },
    { label: "Issues Resolved", value: "1,234", icon: Award, color: "text-success" },
    { label: "This Month", value: "+89", icon: TrendingUp, color: "text-secondary" },
    { label: "Discussions", value: "456", icon: MessageSquare, color: "text-accent" },
  ];

  const discussions = [
    {
      id: 1,
      title: "Road Safety Initiative - Main Street Improvements",
      author: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      category: "Roads",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      location: "Downtown District",
      preview: "The new speed bumps have made a significant difference. Has anyone noticed improved safety for pedestrians?",
      tags: ["safety", "pedestrian", "improvement"]
    },
    {
      id: 2,
      title: "Community Garden Water System Update",
      author: "Mike Rodriguez",
      avatar: "/avatars/mike.jpg",
      category: "Water",
      replies: 12,
      likes: 28,
      timeAgo: "5 hours ago",
      location: "Central Park Area",
      preview: "The irrigation system installation is complete! Thank you to everyone who supported this initiative.",
      tags: ["community", "garden", "water"]
    },
    {
      id: 3,
      title: "Recycling Program Feedback & Suggestions",
      author: "Emma Thompson",
      avatar: "/avatars/emma.jpg",
      category: "Garbage",
      replies: 34,
      likes: 67,
      timeAgo: "1 day ago",
      location: "Citywide",
      preview: "I've been tracking our neighborhood's recycling rates. Here are some ideas to improve participation...",
      tags: ["recycling", "environment", "community"]
    },
    {
      id: 4,
      title: "Street Light Timing Optimization",
      author: "David Park",
      avatar: "/avatars/david.jpg",
      category: "Electricity",
      replies: 18,
      likes: 31,
      timeAgo: "2 days ago",
      location: "Business District",
      preview: "The new smart lighting system is great, but the timing could be adjusted for late-night workers.",
      tags: ["smart-city", "lighting", "business"]
    }
  ];

  const topContributors = [
    { name: "Sarah Chen", contributions: 89, badge: "Problem Solver", avatar: "/avatars/sarah.jpg" },
    { name: "Mike Rodriguez", contributions: 67, badge: "Community Leader", avatar: "/avatars/mike.jpg" },
    { name: "Emma Thompson", contributions: 54, badge: "Eco Champion", avatar: "/avatars/emma.jpg" },
    { name: "David Park", contributions: 43, badge: "Tech Innovator", avatar: "/avatars/david.jpg" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Roads": return "bg-amber-100 text-amber-800";
      case "Water": return "bg-blue-100 text-blue-800";
      case "Electricity": return "bg-yellow-100 text-yellow-800";
      case "Garbage": return "bg-purple-100 text-purple-800";
      case "Sanitation": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Community Hub</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow citizens, share experiences, and collaborate on making our community better together.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {communityStats.map((stat, index) => (
                <Card key={index} className="municipal-card">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* New Post */}
            <Card className="municipal-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start a Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your thoughts, ask questions, or start a discussion about community issues..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Badge variant="outline">Add Category</Badge>
                      <Badge variant="outline">Add Location</Badge>
                    </div>
                    <Button className="municipal-cta">
                      <Send className="mr-2 h-4 w-4" />
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussions */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="municipal-card hover:shadow-[var(--shadow-elevated)] transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={discussion.avatar} alt={discussion.author} />
                        <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-primary hover:text-secondary transition-colors">
                            {discussion.title}
                          </h3>
                          <Badge className={getCategoryColor(discussion.category)}>
                            {discussion.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <span className="font-medium text-foreground">{discussion.author}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{discussion.timeAgo}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{discussion.location}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {discussion.preview}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{discussion.replies}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Discussions
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Contributors */}
            <Card className="municipal-card">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={contributor.avatar} alt={contributor.name} />
                          <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-xs text-accent-foreground">👑</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {contributor.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {contributor.contributions} contributions
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {contributor.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="municipal-card">
              <CardHeader>
                <CardTitle className="text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Group
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Join Local Groups
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Browse Topics
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="municipal-card">
              <CardHeader>
                <CardTitle className="text-primary">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Be respectful and constructive</li>
                  <li>• Focus on community improvement</li>
                  <li>• Verify information before sharing</li>
                  <li>• Support fellow citizens</li>
                  <li>• Report inappropriate content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;