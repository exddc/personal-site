"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Bio } from "@/components/Bio";
import { Announcement, AnnouncementTitle } from "@/components/UI/annoucement";
import { Contact } from "@/components/Contact";

export default function About() {
  const skills = [
    "Swift",
    "Python",
    "Rust",
    "JavaScript / TypeScript",
    "SQL",
    "C/C++",
    "Next.js",
    "PostgreSQL",
    "SwiftUI",
    "React",
    "Grafana",
    "AWS",
    "FastAPI",
    "Astro",
    "MongoDB",
    "Linux",
    "Docker",
    "MQTT",
  ];

  const [firstRowCount, setFirstRowCount] = useState(6);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const cardWidth = 120;
      let count = Math.floor(width / cardWidth);
      if (count >= 3) {
        count = Math.min(count, 6);
      } else {
        count = Math.max(1, count);
      }
      setFirstRowCount(count);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [rows, setRows] = useState<string[][]>([]);
  useEffect(() => {
    const rowCounts: number[] = [];
    let sum = 0;
    let i = 0;
    while (sum < skills.length) {
      const desired = Math.max(firstRowCount - i, 3);
      rowCounts.push(desired);
      sum += desired;
      i++;
    }
    const cumulativeBeforeLast = rowCounts
      .slice(0, rowCounts.length - 1)
      .reduce((a, b) => a + b, 0);
    rowCounts[rowCounts.length - 1] = skills.length - cumulativeBeforeLast;

    const grouped: string[][] = [];
    let index = 0;
    for (const count of rowCounts) {
      grouped.push(skills.slice(index, index + count));
      index += count;
    }
    setRows(grouped);
  }, [firstRowCount, skills.length]);

  return (
    <div className="grid grid-cols-1 gap-36">
      <Bio />
      <section
        id="skils"
        className="mx-auto flex max-w-xl flex-col gap-12 text-center text-lg text-balance"
      >
        <h2 className="font-serif text-5xl italic">Skills</h2>
        <p>
          I love working with these Languages, Frameworks and Technologies and
          have experience with them in various Projects.
        </p>
        <div className="flex flex-col gap-1">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((skill, index) => (
                <Announcement key={index} className="w-fit">
                  <AnnouncementTitle>{skill}</AnnouncementTitle>
                </Announcement>
              ))}
            </div>
          ))}
        </div>
      </section>
      <Contact />
    </div>
  );
}
