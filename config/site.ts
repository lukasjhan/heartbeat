import { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = "https://heartbeat-vert.vercel.app/"

export const siteConfig: SiteConfig = {
  name: "HeartBeat",
  author: "lukasjhan",
  description: "One click setup status page for your service.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: baseUrl,
    author: "https://github.com/lukasjhan",
  },
}

export const contactConfig: ContactConfig = {
  email: "lukas.j.han@gmail.com",
}
