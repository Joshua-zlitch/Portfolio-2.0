export const site = {
  name: 'Benitto Joshua',
  subtitle: 'Game Developer • Creative Technologist',
  bio: 'Computer Science Student | Software Developer | AI & Game Development Enthusiast | Building practical solutions one project at a time.',
  details: {
    role: 'Software & Game Developer',
    philosophy: 'High Performance. Fluid Animations. Immersive Feedback.',
    status: 'Actively building interactive systems',
  },
  skills: [
    {
      id: 'gamedev',
      title: 'Game Development',
      subtitle: 'Unreal & Godot Engines',
      description: 'Creating interactive worlds and responsive systems.',
      items: [
        'Unreal Engine for 3D game development (currently learning)',
        'Godot Engine for 2D gameplay & prototype development',
        'State machine design, physics programming, & custom camera scripting',
        'Optimized game loops and performance tuning'
      ]
    },
    {
      id: 'video',
      title: 'Video Editing',
      subtitle: 'DaVinci Resolve Studio',
      description: 'Post-production workflows and cinematic camera choreography.',
      items: [
        'DaVinci Resolve workflows for gameplay showcases and trailer edits',
        'Keyframing 3D camera sweeps and pacing cuts to sound design',
        'Color correction and balancing for dark, dramatic visuals',
        'Audio layering, ambient mix prep, and transitional effects'
      ]
    },
    {
      id: 'webdev',
      title: 'Web Development',
      subtitle: 'Vite + React + Tailwind',
      description: 'Building premium, interactive web interfaces with 3D elements.',
      items: [
        'Primarily built using AI-assisted / "vibe coding" workflows to rapidly design and ship functional websites',
        'Cinematic layout integration with React Three Fiber',
        'Scroll-tied animations and GPU-conscious particle rigs',
        'Modern responsive web apps with robust performance scores'
      ]
    },
    {
      id: 'aidev',
      title: 'AI / LLM Development',
      subtitle: 'Custom GPTs & Tooling',
      description: 'Integrating artificial intelligence into development pipelines.',
      items: [
        'Builds custom GPTs and custom LLM setups tailored to specific tasks and use cases',
        'Integration of prompt engineering workflows for content and asset generation',
        'API automation scripts to interface with generative models',
        'Leveraging state-of-the-art models for productivity boosts'
      ]
    }
  ],
  projects: [
    {
      id: 'fluxdesk',
      title: 'Fluxdesk',
      subtitle: 'Workspace Automation',
      description: 'A Tauri-powered Windows utility that automates workspace setup, vibe-coded with Rust and TypeScript to interface with the Windows API.',
      tags: ['Tauri', 'Rust', 'TypeScript', 'Windows API'],
      year: '2026',
      linkLabel: 'GitHub Repo',
      link: 'https://github.com/Joshua-zlitch/Fluxdesk'
    },
    {
      id: 'websites',
      title: 'Websites Gallery',
      subtitle: 'Modern Web Deployments',
      description: 'Built and launched multiple websites showcasing interactive animations, dynamic state management, and optimized asset handling.',
      tags: ['React', 'Vite', 'Tailwind', 'AI-assisted', 'Framer Motion'],
      year: '2025 - 2026',
      linkLabel: 'Showcase Grid',
      link: 'https://github.com/Joshua-zlitch'
    },
    {
      id: 'games',
      title: 'Finished Games',
      subtitle: 'Playable Interactive Builds',
      description: 'Developed and completed several games. Playable builds are uploaded and hosted online.',
      tags: ['Godot Engine', 'Itch.io', '2D Physics', 'Game Loops'],
      year: '2024 - 2026',
      linkLabel: 'Play on Itch.io',
      link: 'https://itch.io/profile/benitto-joshua'
    }
  ],
  contact: {
    email: 'Joshua072308@gmail.com',
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/benitto-joshua/' },
      { label: 'GitHub', href: 'https://github.com/Joshua-zlitch' },
      { label: 'Itch.io', href: 'https://itch.io/profile/benitto-joshua' }
    ]
  }
} as const
