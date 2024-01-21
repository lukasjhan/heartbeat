import { HeroHeader, ContentSection } from "@/types/contents"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `HeartBeat`,
  subheader: `Make Worldwide Status Page in a minute`,
  image: `/hero-img.png`,
}

export const featureCards: ContentSection = {
  header: `Features`,
  subheader: `What makes Next Landing possible`,
  content: [
    {
      text: `One Click Setup`,
      subtext: `Deploy your status page in seconds`,
      icon: "mixer",
    },
    {
      text: `Highly Performant and Availablity`,
      subtext: `Support for multiple regions and providers`,
      icon: "barChart",
    },
    {
      text: `Easy Integration`,
      subtext: `Integrate with your tools`,
      icon: "settings",
    },
  ],
}

export const features: ContentSection = {
  header: `Status Page`,
  subheader: `Conprehensive status page for your services`,
  image: `/features-img.webp`,
  content: [
    {
      text: `Server Health`,
      subtext: `Monitor your server health`,
      icon: "fileSearch",
    },
    {
      text: `Service-level objectives`,
      subtext: `Monitor your service-level objectives`,
      icon: "calendar",
    },
    {
      text: `Failure Alerts`,
      subtext: `Get notified when your services are down`,
      icon: "fire",
    },
  ],
}
