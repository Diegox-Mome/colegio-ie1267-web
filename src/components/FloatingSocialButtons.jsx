export default function FloatingSocialButtons() {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/colegiobicentenario1267',
      bgClass: 'bg-[#1877F2] shadow-blue-500/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/colegiobicentenario1267',
      bgClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-pink-500/30',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@colegiobicentenario1267',
      bgClass: 'bg-[#1e2330] shadow-slate-900/40',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.48 6.3 6.3 0 0 0 1.83-4.48V8.71a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.82-.14z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@colegiobicentenario1267',
      bgClass: 'bg-[#e52d27] shadow-red-500/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Blog AIP',
      url: 'https://sites.google.com/view/blog-aip-1267',
      bgClass: 'bg-[#10b981] shadow-emerald-500/30',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      aria-label="Redes sociales flotantes"
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto"
    >
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className={`group relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-x-1 active:scale-95 ${item.bgClass}`}
        >
          {item.icon}

          {/* Tooltip flotante a la izquierda */}
          <span className="absolute right-14 px-2.5 py-1 rounded-md bg-gray-900/90 backdrop-blur-sm text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-md">
            {item.name}
          </span>
        </a>
      ))}
    </aside>
  );
}
