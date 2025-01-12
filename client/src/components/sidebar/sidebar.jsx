import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, UserCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Sidebar({ groups = [], onSelectGroup, onCreateGroup }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Normalize group data to ensure consistent structure
  const normalizedGroups = (Array.isArray(groups) ? groups : []).map(group => ({
    id: group._id || group.id || '',
    name: group.groupName || group.name || 'Unnamed Group',
    image: group.groupAvatar || group.image || null,
    lastMessage: {
      sender: 'System',
      content: 'Group created',
      time: new Date().toISOString()
    }
  }));

  const filteredGroups = normalizedGroups.filter(group => 
    typeof group.name === 'string' && group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (time) => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return 'Recently';
    }
    
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || isCreating) return;

    try {
      setIsCreating(true);
      const response = await fetch('http://localhost:8000/api/chat/create-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          communityID: '6780b95300ff81739896bb37', 
          isGroupChat: true, 
          groupName: newGroupName.trim()
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Group created:', result.chat);

        const normalizedGroup = {
          id: result.chat._id,
          name: result.chat.groupName,
          image: result.chat.groupAvatar,
          lastMessage: {
            sender: 'System',
            content: 'Group created',
            time: new Date().toISOString()
          }
        };
        if (onCreateGroup) {
          onCreateGroup(normalizedGroup);
        }
        setNewGroupName('');
        setIsDialogOpen(false);
      } else {
        console.error('Error creating group:', result.message);
        alert('Failed to create group: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-72 bg-gray-100 flex flex-col border-r">
      <div className="p-4 flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Enter a name for your new group chat.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCreateGroup();
                  }
                }}
                disabled={isCreating}
              />
              <Button 
                onClick={handleCreateGroup} 
                disabled={isCreating || !newGroupName.trim()}
              >
                {isCreating ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredGroups.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No groups found
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div
              key={group.id}
              className="flex items-center p-4 hover:bg-gray-200 cursor-pointer transition-colors"
              onClick={() => onSelectGroup(group)}
            >
              {group.image ? (
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <UserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div className="ml-3 flex-1 min-w-0">
                <h3 className="font-semibold truncate">{group.name}</h3>
                {group.lastMessage && (
                  <>
                    <p className="text-sm text-gray-600 truncate">
                      <span className="font-medium">
                        {group.lastMessage.sender}: 
                      </span>
                      {group.lastMessage.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(group.lastMessage.time)}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;