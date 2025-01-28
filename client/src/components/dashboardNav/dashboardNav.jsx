import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCommunity } from "../../context/community.context";
import {
  ChevronDown,
  ChevronRight,
  Home,
  DollarSign,
  Users,
  Trophy,
  Package,
  Calendar,
  ScrollText,
  Sprout,
} from "lucide-react";
import { useUser } from "../../context/user.context";

export function DashboardNav() {
  const {fetchCommunitiesByUser, createdCommunities, adminCommunities, memberCommunities } = useCommunity();
  const { currentUser } = useUser();

  const [isCreatedOpen, setIsCreatedOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);

  const sections = [
    {
      title: null,
      items: [
        {
          title: "Get started",
          href: "/get-started",
          icon: Sprout,
        },
      ],
    },
    {
      title: null,
      items: [
        {
          title: "Home",
          href: "/",
          icon: Home,
          isActive: true,
        },
       
        {
          title: "Members",
          href: "/members",
          icon: Users,
        },
      ],
    },
    {
      title: "ENGAGE",
      items: [
        {
          title: "chat",
          href: "/chat",
          icon: Trophy,
        },
        {
          title: "Poll",
          href: "/poll",
          icon: Package,
        },
        {
          title: "Events",
          href: "/events",
          icon: Calendar,
        },
        // {
        //   title: "Feed",
        //   href: "/feed",
        //   icon: ScrollText,
        // },
      ],
    },
  ];

  useEffect(() => {
    if (currentUser) {
      fetchCommunitiesByUser(currentUser); // Fetch the communities for the current user
    }
  }, [currentUser]);
 

  return (
    <>
      {/* Sidebar Navigation */}
      <nav className="hidden border-r bg-background lg:block lg:w-64">
        <div className="flex h-full flex-col gap-2">
          {/* Header */}
          <div className="flex h-14 items-center border-b px-4">
            <Link className="flex items-center gap-2 font-semibold" to="/">
              <span className="h-6 w-6 rounded-full bg-primary" />
              Home
            </Link>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 space-y-4 overflow-auto p-4">
            {/* Static Sections */}
            {sections.map((section, i) => (
              <div key={i} className="space-y-3">
                {section.title && (
                  <h4 className="text-xs font-semibold text-muted-foreground">
                    {section.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                        item.isActive ? "bg-accent" : ""
                      }`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Dropdown: Created Communities */}
            <div>
              <div
                onClick={() => setIsCreatedOpen(!isCreatedOpen)}
                className="flex items-center justify-between cursor-pointer px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span>Your Communities</span>
                {isCreatedOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              {isCreatedOpen && (
                <div className="ml-4 space-y-1">
                  {createdCommunities.map((community) => (
                    <Link
                      key={community._id}
                      to={`/communities/${community._id}`}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {community.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown: Admin Communities */}
            <div>
              <div
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="flex items-center justify-between cursor-pointer px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span>Admin Communities</span>
                {isAdminOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              {isAdminOpen && (
                <div className="ml-4 space-y-1">
                  {adminCommunities.map((community) => (
                    <Link
                      key={community._id}
                      to={`/communities/${community._id}`}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {community.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown: Member Communities */}
            <div>
              <div
                onClick={() => setIsMemberOpen(!isMemberOpen)}
                className="flex items-center justify-between cursor-pointer px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span>Member Communities</span>
                {isMemberOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              {isMemberOpen && (
                <div className="ml-4 space-y-1">
                  {memberCommunities.map((community) => (
                    <Link
                      key={community._id}
                      to={`/communities/${community._id}`}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {community.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Outlet />
    </>
  );
}
