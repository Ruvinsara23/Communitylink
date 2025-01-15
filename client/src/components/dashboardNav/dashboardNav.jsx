import { Link } from 'react-router'
import { Home, DollarSign, Users, Trophy, Package, Calendar, ScrollText, Send, Megaphone, BarChart, Settings, Sprout } from 'lucide-react'

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
        title: "Money",
        href: "/money",
        icon: DollarSign,
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
        title: "Challenges",
        href: "/challenges",
        icon: Trophy,
      },
      {
        title: "Products",
        href: "/products",
        icon: Package,
      },
      {
        title: "Events",
        href: "/events",
        icon: Calendar,
      },
      {
        title: "Feed",
        href: "/feed",
        icon: ScrollText,
      },
    ],
  },
  {
    title: "MARKETING",
    items: [
      {
        title: "Magic Reach",
        href: "/magic-reach",
        icon: Send,
      },
      {
        title: "Promotions",
        href: "/promotions",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "MANAGE",
    items: [
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
]

export function DashboardNav() {
  return (
    <nav className="hidden border-r bg-background lg:block lg:w-64">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="h-6 w-6 rounded-full bg-primary" />
            Dollpenguin
          </Link>
        </div>
        <div className="flex-1 space-y-4 overflow-auto p-4">
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
                    href={item.href}
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
        </div>
      </div>
    </nav>
  )
}

