"use client";

import React, { useEffect, useState } from "react";

interface StatItem {
  number: string;
  label: string;
  prefix: string;
  suffix: string;
}

const Counter = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { number: "1984", label: "Founded in London", prefix: "", suffix: "" },
    { number: "9001", label: "Quality Certified", prefix: "ISO ", suffix: "" },
    { number: "10", label: "Countries Served", prefix: "", suffix: "+" },
    { number: "20000", label: "Trade Clients", prefix: "", suffix: "+" },
  ]);

  const [counts, setCounts] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/pages/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setStats(data.stats);
          setCounts(data.stats.map(() => 0));
        }
      })
      .catch(console.error)
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded || stats.length === 0) return;
    setCounts(stats.map(() => 0));

    const intervals = stats.map((item, index) => {
      const target = parseInt(item.number, 10) || 0;
      const increment = Math.ceil(target / 100);

      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < target) {
            newCounts[index] = Math.min(newCounts[index] + increment, target);
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, [loaded, stats]);

  return (
    <section className="w-full bg-[#1E3A8A] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 xl:grid-cols-4 text-center lg:divide-x lg:divide-y xl:divide-y-0 divide-white/20">
          {stats.map((item, index) => (
            <div
              key={index}
              className="py-4 flex flex-col items-center justify-center"
            >
              <h3 className="text-xl xl:text-2xl font-barlow font-bold text-[#FB923C]">
                {item.prefix}
                {counts[index] ?? parseInt(item.number, 10)}
                {item.suffix}
              </h3>
              <p className="text-xs font-inter xl:text-sm text-gray-200">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
