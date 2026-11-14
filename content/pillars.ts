export type PillarId = "stories" | "data" | "digital" | "capability";

export const pillars: {
  id: PillarId;
  name: string;
  promise: string;
  line: string;
  serviceTags: string[];
  services: { name: string; description: string }[];
  steps: string[];
}[] = [
  {
    id: "stories",
    name: "Stories",
    promise: "Show the human side of your work.",
    line: "Documentaries, success stories and photography that put real people and real change on screen.",
    serviceTags: ["documentary", "video", "photo"],
    services: [
      { name: "Impact documentaries", description: "5 to 30 minute films that follow real people and real change." },
      { name: "Success stories", description: "Written stories with photos for reports, websites and donors." },
      { name: "Short videos and reels", description: "30 to 90 second videos for social media, events and campaigns." },
      { name: "Photo stories", description: "Documentary photography with captions and consent." },
      { name: "Motion graphics and explainers", description: "Animated videos that explain a program, a policy or a product." },
      { name: "Case studies", description: "Structured stories of a project from challenge to result." },
    ],
    steps: ["Story plan and consent protocol", "Field production with a Somali-speaking crew", "Edit with two review rounds", "Delivery with subtitles, cut-downs and captions"],
  },
  {
    id: "data",
    name: "Data",
    promise: "Prove results with numbers.",
    line: "Dashboards, clean datasets and visual reports that make your results easy to check.",
    serviceTags: ["dashboard", "report"],
    services: [
      { name: "M&E dashboards", description: "Live dashboards linked to your indicators and logframe." },
      { name: "Data cleaning and management", description: "Fixing, joining and organizing messy datasets." },
      { name: "Data collection tools", description: "KoBo and ODK forms, training for enumerators, quality checks." },
      { name: "Data visualization and reports", description: "Charts, infographics and visual reports people actually read." },
      { name: "Business intelligence", description: "Sales, stock and operations dashboards for companies." },
    ],
    steps: ["Data audit against your indicators", "Cleaning, joining and modelling", "Dashboard build and review", "Training and 30 days of support"],
  },
  {
    id: "digital",
    name: "Digital",
    promise: "Look credible and work efficiently.",
    line: "Websites, brand identities and systems that make a strong organization look like one.",
    serviceTags: ["website", "system"],
    services: [
      { name: "Websites", description: "Fast, mobile-first websites that are easy to update." },
      { name: "Brand identity", description: "Logos, colors, typography and brand guides." },
      { name: "Management systems", description: "Custom systems for HR, finance, projects, grants, bookings and inventory." },
      { name: "Portals and platforms", description: "Member, beneficiary or partner portals." },
    ],
    steps: ["Discovery and content plan", "Design with one clear direction", "Build, test on slow networks, train your team", "Launch, then measure"],
  },
  {
    id: "capability",
    name: "Capability",
    promise: "Help your team do more themselves.",
    line: "Training and AI tools so your people can keep telling, measuring and showing your work.",
    serviceTags: ["training"],
    services: [
      { name: "AI fluency training", description: "Practical AI skills for leaders and staff." },
      { name: "AI workflows and assistants", description: "Custom tools that save hours on reports, translation and data entry." },
      { name: "Course production", description: "E-learning courses with video lessons, quizzes and an LMS." },
      { name: "Communications training", description: "Storytelling, photography and social media for program teams." },
    ],
    steps: ["Skills and workflow assessment", "Hands-on sessions in English and Somali", "Tools built for your real tasks", "Follow-up and a guide your team keeps"],
  },
];

/** Field photo shown for each pillar (ids from content/photos.json). */
export const PILLAR_PHOTO: Record<PillarId, string> = { stories: "shelter", data: "canal-men", digital: "market", capability: "farmer" };

export const pillarById = (id: string) => pillars.find((p) => p.id === id);
