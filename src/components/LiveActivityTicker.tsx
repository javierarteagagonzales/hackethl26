"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityItem {
  id: string;
  name: string;
  action: string;
  timestamp: string;
  avatar?: string;
}

const ACTIVITY_TEMPLATES = [
  {
    names: ["Sofia García", "Juan Rodriguez", "María López", "Carlos Mendez", "Ana Martínez", "Diego Pérez", "Isabella Santos", "Lucas Oliveira"],
    actions: [
      "registered for the hackathon",
      "submitted a project",
      "joined a team",
      "forked the starter template",
      "asked a question in Discord",
      "completed the tutorial",
      "signed up for mentoring",
      "registered a team",
    ],
  },
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateActivity = (): ActivityItem => {
  const { names, actions } = ACTIVITY_TEMPLATES[0];
  const now = new Date();
  const secondsAgo = Math.floor(Math.random() * 45) + 1;
  const timestamp = `${secondsAgo}s ago`;

  return {
    id: `${Date.now()}-${Math.random()}`,
    name: getRandomItem(names),
    action: getRandomItem(actions),
    timestamp,
  };
};

interface LiveActivityTickerProps {
  maxItems?: number;
  updateInterval?: number;
}

export function LiveActivityTicker({
  maxItems = 5,
  updateInterval = 2000,
}: LiveActivityTickerProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "initial-1",
      name: "Team ETH Lima",
      action: "hackathon event launched",
      timestamp: "just now",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => {
        const newActivity = generateActivity();
        const updated = [newActivity, ...prev].slice(0, maxItems);
        return updated;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, maxItems]);

  return (
    <div
      className="space-y-3 overflow-hidden"
      role="feed"
      aria-label="Live activity updates"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="text-xs font-semibold text-fg/60 uppercase tracking-wider mb-4">
        Live Activity
      </div>

      <AnimatePresence mode="popLayout">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: -20, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 10 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex gap-3 items-start p-3 rounded-lg bg-surface/40 border border-border/50 hover:border-brand-accent/30 transition-colors"
          >
            {/* Avatar Pulse */}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent/60 flex items-center justify-center text-xs font-bold text-bg">
                {activity.name.charAt(0)}
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border border-brand-accent/60"
                animate={{
                  scale: [1, 1.4],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </div>

            {/* Activity Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg truncate">
                <span className="text-brand-accent">{activity.name}</span>{" "}
                <span className="text-fg/70">{activity.action}</span>
              </p>
              <p className="text-xs text-fg/50 mt-1">{activity.timestamp}</p>
            </div>

            {/* Dot Indicator */}
            <motion.div
              className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-accent"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
