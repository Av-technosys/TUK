"use client"

import React, { useEffect, useState } from "react"

const Counter = () => {

  const stats = [
    { number: 1984, label: "Founded in London" },
    { number: 9001, label: "Quality Certified", prefix: "ISO " },
    { number: 10, label: "Countries Served", suffix: "+" },
    { number: 20000, label: "Trade Clients", suffix: "+" },
  ]

  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {

    const intervals = stats.map((item, index) => {

      const increment = Math.ceil(item.number / 100)

      return setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev]

          if (newCounts[index] < item.number) {
            newCounts[index] = Math.min(newCounts[index] + increment, item.number)
          }

          return newCounts
        })
      }, 20)

    })

    return () => intervals.forEach(clearInterval)

  }, [])

  return (
    <section className="w-full bg-[#1E3A8A] text-white">
      <div className="max-w-7xl mx-auto px-4">

       <div className="grid grid-cols-2 xl:grid-cols-4 text-center divide-x divide-y xl:divide-y-0 divide-white/20">

          {stats.map((item, index) => (
            <div
              key={index}
              className="py-4 flex flex-col items-center justify-center"
            >

              <h3 className="text-xl xl:text-2xl font-bold text-[#FB923C]">
                {item.prefix}{counts[index].toLocaleString()}{item.suffix}
              </h3>

              <p className="text-xs xl:text-sm text-gray-200">
                {item.label}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Counter