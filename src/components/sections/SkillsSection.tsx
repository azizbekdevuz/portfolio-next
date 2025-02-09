"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideCpu,
  LucideDatabase,
  LucideMonitor,
  LucideCode,
} from "lucide-react";

const iconMapping = {
  processor: LucideCpu,
  memory: LucideDatabase,
  io: LucideMonitor,
  controller: LucideCode,
};

interface CircuitNode {
  id: string;
  title: string;
  description: string;
  type: "processor" | "memory" | "io" | "controller";
  voltageLevel: number;
  stats: { power: number; frequency: number };
  details: {
    experience: string;
    level: number;
    subSkills: { name: string; proficiency: number }[];
  };
}

const circuitNodes: CircuitNode[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Building immersive, high-performance UIs",
    type: "processor",
    voltageLevel: 5,
    stats: { power: 90, frequency: 2.4 },
    details: {
      experience: "2+ years",
      level: 90,
      subSkills: [
        { name: "React/Next.js", proficiency: 95 },
        { name: "TypeScript", proficiency: 90 },
        { name: "Framer Motion", proficiency: 85 },
        { name: "Tailwind CSS", proficiency: 95 },
      ],
    },
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Optimized and scalable server-side solutions",
    type: "memory",
    voltageLevel: 4.2,
    stats: { power: 85, frequency: 2.0 },
    details: {
      experience: "2+ years",
      level: 85,
      subSkills: [
        { name: "Node.js", proficiency: 90 },
        { name: "Express.js", proficiency: 85 },
        { name: "REST & GraphQL APIs", proficiency: 88 },
        { name: "Database Optimization", proficiency: 80 },
      ],
    },
  },
];

export function SkillsSection() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNode, setModalNode] = useState<CircuitNode | null>(null);

  const handleNodeClick = useCallback(
    (node: CircuitNode) => {
      setSelectedNode(selectedNode === node.id ? null : node.id);
      if (window.innerWidth < 768) {
        setModalNode(node);
        setIsModalOpen(true);
      }
    },
    [selectedNode],
  );

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Next-Level Skills
        </motion.h2>
        <p className="text-lg text-gray-400 mb-12">
          A futuristic, interactive skill showcase
        </p>

        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10 rounded-2xl bg-gray-900/20 border border-gray-800 shadow-2xl backdrop-blur-xl">
          {circuitNodes.map((node) => {
            const Icon = iconMapping[node.type];
            return (
              <motion.div
                key={node.id}
                className={`relative p-6 rounded-xl border-2 bg-gray-900/60 text-center transition-all duration-300 shadow-lg cursor-pointer ${
                  selectedNode === node.id
                    ? "border-blue-500"
                    : "border-gray-700"
                }`}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 10px 30px rgba(0, 120, 255, 0.3)",
                }}
                onClick={() => handleNodeClick(node)}
              >
                <Icon size={40} className="mb-3 text-blue-400" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {node.title}
                </h3>
                <p className="text-sm text-gray-400">{node.description}</p>
                <motion.div
                  className="absolute top-3 right-3 text-xs text-blue-400 font-mono"
                  animate={{ opacity: [0, 1], scale: [0.8, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  {node.voltageLevel}V
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && modalNode && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-gray-900/80 p-6 rounded-xl border border-blue-500 text-white shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <DetailPanel node={modalNode} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DetailPanel({ node }: { node: CircuitNode }) {
  return (
    <div>
      <h3 className="text-3xl font-bold text-blue-400 mb-3">{node.title}</h3>
      <p className="text-gray-400 mb-4">{node.description}</p>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
        <div>Experience: {node.details.experience}</div>
        <div>Power: {node.stats.power}W</div>
        <div>Frequency: {node.stats.frequency}GHz</div>
      </div>
      <h4 className="mt-5 text-xl text-blue-400">Skills</h4>
      <div className="space-y-2">
        {node.details.subSkills.map((skill) => (
          <div key={skill.name} className="relative">
            <div className="flex justify-between text-sm text-gray-300">
              <span>{skill.name}</span>
              <span>{skill.proficiency}%</span>
            </div>
            <motion.div
              className="h-2 rounded-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
