import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Construction, 
  Droplets, 
  Zap, 
  Trash2, 
  ShieldCheck,
  Upload,
  MapPin,
  Camera,
  Send,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "roads", name: "Roads", icon: Construction, color: "text-amber-600" },
    { id: "water", name: "Water", icon: Droplets, color: "text-blue-600" },
    { id: "electricity", name: "Electricity", icon: Zap, color: "text-yellow-600" },
    { id: "sanitation", name: "Sanitation", icon: ShieldCheck, color: "text-green-600" },
    { id: "garbage", name: "Garbage", icon: Trash2, color: "text-purple-600" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !description || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Issue Reported Successfully",
        description: "Your issue has been submitted and will be reviewed by the relevant department.",
      });
      
      // Reset form
      setSelectedCategory("");
      setDescription("");
      setLocation("");
    }, 2000);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Report an Issue</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us improve your community by reporting municipal issues. Your reports help us prioritize and address problems efficiently.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Category Selection */}
          <div className="lg:col-span-1">
            <Card className="municipal-card sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Select Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <category.icon 
                            className={`h-6 w-6 ${isSelected ? 'text-primary' : category.color}`} 
                          />
                          <span className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {category.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {selectedCategory && (
                  <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                    <Badge variant="secondary" className="mb-2">
                      AI Suggestion
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Based on your selection, this issue will be automatically routed to the 
                      {" " + categories.find(c => c.id === selectedCategory)?.name} department.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="municipal-card">
              <CardHeader>
                <CardTitle className="text-primary">Issue Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Please describe the issue in detail..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter address or nearby landmark"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Be as specific as possible to help us locate the issue quickly
                    </p>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium">
                      Priority Level
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Non-urgent</SelectItem>
                        <SelectItem value="medium">Medium - Should be addressed</SelectItem>
                        <SelectItem value="high">High - Urgent attention needed</SelectItem>
                        <SelectItem value="emergency">Emergency - Immediate action required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Photos/Videos (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Camera className="h-5 w-5" />
                          <Upload className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supported: JPG, PNG, MP4 (Max 10MB each)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-sm font-medium">
                        Your Name (Optional)
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-sm font-medium">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="contact-phone"
                        placeholder="Enter your phone number"
                        type="tel"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !selectedCategory || !description || !location}
                      className="municipal-cta"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Issue Report
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;