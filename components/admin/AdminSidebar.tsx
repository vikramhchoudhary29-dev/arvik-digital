import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  MessageSquare,
  Star,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Services", href: "/admin/services", icon: BriefcaseBusiness },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/10 bg-black/80 p-6 backdrop-blur-xl lg:block">
      <a href="/admin/dashboard" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-lg font-black text-yellow-300">
          A
        </div>

        <div>
          <h1 className="text-lg font-black tracking-[0.18em]">ARVIK</h1>
          <p className="-mt-1 text-xs tracking-[0.32em] text-yellow-300">
            ADMIN
          </p>
        </div>
      </a>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-zinc-400 transition hover:bg-yellow-400/10 hover:text-yellow-300"
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </a>
          );
        })}
      </nav>

      <a
        href="/admin/login"
        className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-zinc-400 transition hover:border-red-400/30 hover:text-red-300"
      >
        <LogOut size={20} />
        Logout
      </a>
    </aside>
  );
}