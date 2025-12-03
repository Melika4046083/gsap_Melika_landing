// Navigation links configuration - Hero + 2 Columns + Featured (Qt Resources style)
export const navLinks = [
  {
    label: "Product",
    href: "/products",
    submenu: {
      hero: {
        title: "CGI Studio Software",
        description: "CGI Studio empowers productivity across the entire product development lifecycle, from UI design and software development to quality assurance and deployment. Find the solution that best suits your needs."
      },
      columns: [
        {
          title: "SOLUTIONS BY INDUSTRY",
          items: [
            { label: "Automotive", href: "/automotive" },
            { label: "Medical", href: "/medical" },
            { label: "Industrial", href: "/industrial" },
            { label: "Appliances", href: "/appliances" },
            { label: "Wearable Technology", href: "/wearable" }
          ]
        },
        {
          title: "DEVELOPMENT TOOLS",
          items: [
            { label: "CGI Studio Framework", href: "/products/framework" },
            { label: "Development Tools", href: "/products/development-tools" },
            { label: "Figma Integration", href: "/products/figma-integration" },
            { label: "Design Studio", href: "/products/design-studio" }
          ]
        }
      ],
      featured: {
        title: "GET STARTED",
        items: [
          {
            label: "Free Trial",
            description: "Start your 30-day free trial with full access to all CGI Studio features.",
            href: "/trial"
          },
          {
            label: "Documentation",
            description: "Comprehensive guides and API references to help you get started quickly.",
            href: "/documentation"
          },
          {
            label: "Demos & Examples",
            description: "Explore live demos and example projects to see CGI Studio in action.",
            href: "/demos"
          }
        ]
      }
    }
  },
  {
    label: "Solutions",
    href: "/solutions",
    submenu: {
      hero: {
        title: "Industry Solutions",
        description: "Discover how CGI Studio powers innovative user interfaces across different industries with tailored solutions for each sector."
      },
      columns: [
        {
          title: "MAIN INDUSTRIES",
          items: [
            { label: "Automotive HMI", href: "/automotive" },
            { label: "Medical Devices", href: "/medical" },
            { label: "Industrial Automation", href: "/industrial" },
            { label: "Wearable Technology", href: "/wearable" },
            { label: "Smart Appliances", href: "/appliances" }
          ]
        },
        {
          title: "SPECIALIZED SOLUTIONS",
          items: [
            { label: "Digital Cockpits", href: "/solutions/digital-cockpits" },
            { label: "Medical Imaging", href: "/solutions/medical-imaging" },
            { label: "Factory Automation", href: "/solutions/factory-automation" },
            { label: "Consumer Electronics", href: "/solutions/consumer-electronics" }
          ]
        }
      ],
      featured: {
        title: "SUCCESS STORIES",
        items: [
          {
            label: "Automotive Case Study",
            description: "How a leading EV manufacturer built their digital cockpit with CGI Studio.",
            href: "/case-studies/automotive"
          },
          {
            label: "Medical Device Success",
            description: "Revolutionizing patient monitoring systems with real-time visualization.",
            href: "/case-studies/medical"
          },
          {
            label: "Industrial Innovation",
            description: "Transforming factory control systems with intuitive HMI interfaces.",
            href: "/case-studies/industrial"
          }
        ]
      }
    }
  },
  {
    label: "Resources",
    href: "/resources",
    submenu: {
      hero: {
        title: "Our Ultimate Collection of Resources",
        description: "Get the latest resources, check out upcoming events, and see who's innovating with Candera CGI Studio."
      },
      columns: [
        {
          title: "LEARNING & DOCUMENTATION",
          items: [
            { label: "Documentation", href: "/documentation" },
            { label: "Tutorials", href: "/tutorials" },
            { label: "API Reference", href: "/api" },
            { label: "Virtual Booth", href: "/virtual-booth" },
            { label: "Video Demos", href: "/demos" }
          ]
        },
        {
          title: "COMMUNITY & SUPPORT",
          items: [
            { label: "Blog", href: "/blog" },
            { label: "Success Stories", href: "/success-stories" },
            { label: "Forum", href: "/forum" },
            { label: "Webinars", href: "/webinars" },
            { label: "Support Center", href: "/support" }
          ]
        }
      ],
      featured: {
        title: "GET HELP",
        items: [
          {
            label: "Contact Support",
            description: "Get direct help from our technical experts for your specific use case.",
            href: "/support"
          },
          {
            label: "Request a Demo",
            description: "Schedule a personalized demo to see how CGI Studio can work for you.",
            href: "/request-demo"
          },
          {
            label: "Training Programs",
            description: "Comprehensive training to help your team master CGI Studio.",
            href: "/training"
          }
        ]
      }
    }
  },
  {
    label: "Company",
    href: "/company",
    submenu: {
      hero: {
        title: "About Candera",
        description: "Learn more about Candera's mission to revolutionize embedded graphics and our commitment to customer success."
      },
      columns: [
        {
          title: "ABOUT CANDERA",
          items: [
            { label: "Our Story", href: "/company" },
            { label: "Leadership Team", href: "/company#team" },
            { label: "Careers", href: "/careers" },
          ]
        },
        {
          title: "COMPANY INFO",
          items: [
            { label: "Contact Us", href: "/contact" },
            { label: "Offices", href: "/offices" },
          ]
        }
      ],
      featured: {
        title: "GET IN TOUCH",
        items: [
          {
            label: "Careers at Candera",
            description: "Join our team and help shape the future of embedded graphics.",
            href: "/careers"
          },
          {
            label: "Partner Program",
            description: "Become a Candera partner and expand your business opportunities.",
            href: "/partners"
          },
          {
            label: "Contact Sales",
            description: "Speak with our sales team about enterprise solutions and pricing.",
            href: "/contact-sales"
          }
        ]
      }
    }
  },
];