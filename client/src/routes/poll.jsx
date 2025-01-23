import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Plus, Vote } from "lucide-react";
import PollCreator from "../components/poll/createPoll";
import axios from "axios"; // For API requests

export default function PollingPage() {
  // State for storing polls
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/poll/community/6780b95300ff81739896bb37");
        setPolls(response.data); // Assuming the API returns an array of polls
        setLoading(false);
      } catch (err) {
        setError("Failed to load polls.");
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Polling Dashboard</h1>
          <p className="text-muted-foreground">Create and manage polls, view voting history</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Poll
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a New Poll</DialogTitle>
            </DialogHeader>
            <PollCreator />
          </DialogContent>
        </Dialog>
      </div>

      {/* Poll History Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Poll History</h2>
        {loading && <p>Loading polls...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && polls.length === 0 && <p>No polls found.</p>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll) => (
            <div key={poll._id} className="border rounded-lg p-6 space-y-4 bg-card">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-xl">{poll.title}</h3>
                {poll.voted && (
                  <span className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full flex items-center">
                    <Vote className="w-4 h-4 mr-1" />
                    Voted
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {poll.options.map((option, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{option.text}</span>
                      <span>{Math.round((option.votes / poll.totalVotes) * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(option.votes / poll.totalVotes) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{poll.totalVotes} votes</span>
                <span>Created {new Date(poll.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
