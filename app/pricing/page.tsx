"use client";

import HeadingText from "@/components/heading-text";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    text: "Basic",
    price: "$5 per Endpoint",
    subtext: "Designed for individuals to quickly setup status page",
    plan: [
      "Unlimited Incidents",
      "Slack Integration",
      "Email Support",
      "1 Team Member",
      "1 Week Status History",
    ],
  },
  {
    text: "Pro",
    price: "$10 per Endpoint",
    subtext:
      "Designed for individuals and early-stage businesses to quickly setup status page",
    plan: [
      "Basic +",
      "Custom Branding(Domain, Color, Logo)",
      "Slack Support",
      "5 Team Members",
      "1 Year Status History",
    ],
  },
  {
    text: "Enterprise",
    price: "Custom",
    subtext: "Designed for companies that need to configure custom features",
    plan: [
      "Pro +",
      "Custom Integrations",
      "Priority Support",
      "Unlimited Team Members",
      "Unlimited Status History",
    ],
  },
];

export default function Pricing() {
  const Icon = Icons["check"];
  return (
    <main
      className="container flex flex-col items-center gap-12 py-8"
      id="contact"
    >
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText>Pricing</HeadingText>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featureCards.map((cards) => {
          return (
            <Card
              key={cards.text}
              className="flex flex-grow flex-col items-center justify-between gap-10 p-8 dark:bg-secondary"
            >
              <div className="space-y-6">
                <CardTitle>{cards.text}</CardTitle>
                <div className="text-center text-center text-3xl font-bold">
                  {cards.price}
                </div>
                <CardDescription>{cards.subtext}</CardDescription>
              </div>
              <div className="flex flex-col items-start justify-start gap-4">
                {cards.plan.map((plan, i) => {
                  const classname = i === 0 ? "font-bold" : "font-light";
                  return (
                    <div
                      key={i}
                      className={cn("flex flex-row gap-2", classname)}
                    >
                      <Icon className="h-[1.4rem] w-[1.4rem]" />
                      {plan}
                    </div>
                  );
                })}
              </div>
              <Button
                className="w-full"
                variant={cards.text === "Pro" ? "default" : "outline"}
                onClick={() => {
                  window.location.href = "/#contact";
                }}
              >
                Contact to Sales
              </Button>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
