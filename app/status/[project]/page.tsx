"use client";

import HeadingText from "@/components/heading-text";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const worldServers = [
  {
    text: "US East",
    subtext: "No Issue",
  },
  {
    text: "US West",
    subtext: "No Issue",
  },
  {
    text: "EU West",
    subtext: "No Issue",
  },
  {
    text: "EU East",
    subtext: "No Issue",
  },
  {
    text: "Singapore",
    subtext: "No Issue",
  },
  {
    text: "Japan",
    subtext: "No Issue",
  },
  {
    text: "Africa",
    subtext: "No Issue",
  },
  {
    text: "Middle East",
    subtext: "No Issue",
  },
  {
    text: "South America",
    subtext: "No Issue",
  },
];

const featureCards = [
  {
    text: "Auth/Workspace",
    subtext: "No Issue",
  },
  {
    text: "Alert System",
    subtext: "No Issue",
  },
  {
    text: "Dashboard",
    subtext: "No Issue",
  },
  ...worldServers,
];

export default function Page({ params }: { params: { project: string } }) {
  if (params.project !== "heartbeat") {
    return (
      <main
        className="container flex flex-col items-center gap-12 py-8"
        id="contact"
      >
        <div className="flex flex-col items-center space-y-2 text-center">
          <HeadingText>{`404: Project ${params.project} not found`}</HeadingText>
        </div>
      </main>
    );
  }

  const Icon = Icons["check"];

  return (
    <main
      className="container flex flex-col items-center gap-12 py-8"
      id="contact"
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="Having trouble? Troubleshoot connection issues to email us.">{`${capitalizeFirstLetter(
          params.project
        )} Status`}</HeadingText>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {featureCards.map((cards) => {
          return (
            <Card
              key={cards.text}
              className="flex flex-grow flex-col items-center justify-between gap-10 p-8 dark:bg-secondary"
            >
              <div className="flex flex-col items-center space-y-2">
                <CardTitle>{cards.text}</CardTitle>
                <CardDescription>{cards.subtext}</CardDescription>
                <Icon className="h-[5rem] w-[5rem]" />
              </div>
            </Card>
          );
        })}
      </div>
      <div>History</div>
    </main>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
