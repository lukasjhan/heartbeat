"use client";

import HeadingText from "@/components/heading-text";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import WorldMap, { CountryContext } from "react-svg-worldmap";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const data = [
  { country: "us", value: 28 }, // united states
  { country: "br", value: 815 }, // brazil
  { country: "za", value: 1426 }, // south africa
  { country: "jp", value: 153 }, // japan
  { country: "sg", value: 111 }, // signapore
  { country: "in", value: 211 }, // signapore
  { country: "gb", value: 56 }, // united kingdom
  { country: "de", value: 72 }, // germany
  { country: "eg", value: 919 }, // germany
];

const stylingFunction = ({
  countryValue,
  minValue,
  maxValue,
  countryName,
  color,
}: CountryContext) => {
  const calculatedValue = typeof countryValue === "string" ? 0 : countryValue;
  const opacityLevel =
    calculatedValue !== undefined ? 0.1 + (1.5 * calculatedValue) / 2000 : 0;
  return {
    fill: countryName === "us" ? "blue" : color,
    fillOpacity: opacityLevel,
    stroke: "black",
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: "pointer",
  };
};

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

const heatmap = [
  { date: "2024-01-01", count: 580 },
  { date: "2023-11-29", count: 1790 },
  { date: "2024-12-03", count: 370 },
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

  const today = new Date();
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
      <div className="text-3xl font-bold">History</div>
      <div className="flex flex-row gap-8">
        <div
          className="p-4"
          style={{
            position: "relative",
            width: "600px",
          }}
        >
          <CalendarHeatmap
            startDate={shiftDate(today, -100)}
            endDate={today}
            values={heatmap}
            classForValue={(value) => {
              if (!value) {
                return "color-scale-1";
              }

              let level = 1;
              if (value.count > 200) {
                level = 2;
              } else if (value.count > 500) {
                level = 3;
              } else if (value.count > 1000) {
                level = 4;
              }

              return `color-scale-${level}`;
            }}
            titleForValue={(value) => {
              if (!value) {
                return "No data";
              }

              return `Date is ${value.date}`;
            }}
            showWeekdayLabels={true}
          />
        </div>
        <div className="border-4 border-[#ea6b62] p-4">
          <WorldMap
            color="red"
            title="[World Map] Region Latency"
            valuePrefix="latency"
            valueSuffix="ms"
            size="xl"
            data={data}
            styleFunction={stylingFunction}
          />
        </div>
      </div>
    </main>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}
