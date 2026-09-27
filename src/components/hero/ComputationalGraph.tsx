"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  depth: "fg" | "mid" | "bg";
  baseRadius: number;
  layer: number;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  depth: "fg" | "mid" | "bg";
}

// 54 organically distributed computational nodes
const GRAPH_NODES: GraphNode[] = [
  // Layer 0: Data & Signal Entry (7 nodes)
  { id: "n0_1", x: 45, y: 75, depth: "bg", baseRadius: 2.2, layer: 0 },
  { id: "n0_2", x: 65, y: 135, depth: "mid", baseRadius: 3.0, layer: 0 },
  { id: "n0_3", x: 35, y: 195, depth: "fg", baseRadius: 4.2, layer: 0 },
  { id: "n0_4", x: 70, y: 255, depth: "mid", baseRadius: 2.8, layer: 0 },
  { id: "n0_5", x: 40, y: 320, depth: "fg", baseRadius: 3.8, layer: 0 },
  { id: "n0_6", x: 60, y: 385, depth: "bg", baseRadius: 2.0, layer: 0 },
  { id: "n0_7", x: 85, y: 430, depth: "bg", baseRadius: 1.8, layer: 0 },

  // Layer 1: Feature Representation & Encodings (11 nodes)
  { id: "n1_1", x: 135, y: 50, depth: "bg", baseRadius: 2.2, layer: 1 },
  { id: "n1_2", x: 155, y: 95, depth: "mid", baseRadius: 3.2, layer: 1 },
  { id: "n1_3", x: 125, y: 145, depth: "fg", baseRadius: 4.0, layer: 1 },
  { id: "n1_4", x: 170, y: 175, depth: "mid", baseRadius: 3.0, layer: 1 },
  { id: "n1_5", x: 140, y: 220, depth: "fg", baseRadius: 4.4, layer: 1 },
  { id: "n1_6", x: 165, y: 265, depth: "mid", baseRadius: 3.2, layer: 1 },
  { id: "n1_7", x: 130, y: 310, depth: "fg", baseRadius: 3.8, layer: 1 },
  { id: "n1_8", x: 175, y: 350, depth: "bg", baseRadius: 2.4, layer: 1 },
  { id: "n1_9", x: 145, y: 395, depth: "mid", baseRadius: 3.0, layer: 1 },
  { id: "n1_10", x: 180, y: 435, depth: "bg", baseRadius: 2.0, layer: 1 },
  { id: "n1_11", x: 110, y: 270, depth: "bg", baseRadius: 2.2, layer: 1 },

  // Layer 2: Core Deep Latent / Attention Clusters (15 nodes)
  { id: "n2_1", x: 235, y: 40, depth: "bg", baseRadius: 2.0, layer: 2 },
  { id: "n2_2", x: 260, y: 80, depth: "mid", baseRadius: 3.2, layer: 2 },
  { id: "n2_3", x: 225, y: 115, depth: "fg", baseRadius: 4.5, layer: 2 },
  { id: "n2_4", x: 275, y: 140, depth: "mid", baseRadius: 3.4, layer: 2 },
  { id: "n2_5", x: 240, y: 175, depth: "fg", baseRadius: 4.8, layer: 2 },
  { id: "n2_6", x: 285, y: 205, depth: "fg", baseRadius: 4.2, layer: 2 },
  { id: "n2_7", x: 220, y: 235, depth: "mid", baseRadius: 3.0, layer: 2 },
  { id: "n2_8", x: 265, y: 260, depth: "fg", baseRadius: 4.6, layer: 2 },
  { id: "n2_9", x: 230, y: 295, depth: "mid", baseRadius: 3.2, layer: 2 },
  { id: "n2_10", x: 280, y: 325, depth: "fg", baseRadius: 4.0, layer: 2 },
  { id: "n2_11", x: 245, y: 365, depth: "mid", baseRadius: 3.4, layer: 2 },
  { id: "n2_12", x: 270, y: 405, depth: "bg", baseRadius: 2.4, layer: 2 },
  { id: "n2_13", x: 225, y: 445, depth: "bg", baseRadius: 1.8, layer: 2 },
  { id: "n2_14", x: 295, y: 105, depth: "bg", baseRadius: 2.2, layer: 2 },
  { id: "n2_15", x: 290, y: 280, depth: "bg", baseRadius: 2.5, layer: 2 },

  // Layer 3: Optimization / Manifold Transformations (12 nodes)
  { id: "n3_1", x: 355, y: 55, depth: "bg", baseRadius: 2.2, layer: 3 },
  { id: "n3_2", x: 380, y: 95, depth: "mid", baseRadius: 3.4, layer: 3 },
  { id: "n3_3", x: 345, y: 135, depth: "fg", baseRadius: 4.4, layer: 3 },
  { id: "n3_4", x: 395, y: 170, depth: "mid", baseRadius: 3.2, layer: 3 },
  { id: "n3_5", x: 360, y: 215, depth: "fg", baseRadius: 4.6, layer: 3 },
  { id: "n3_6", x: 405, y: 250, depth: "fg", baseRadius: 4.0, layer: 3 },
  { id: "n3_7", x: 340, y: 280, depth: "mid", baseRadius: 3.0, layer: 3 },
  { id: "n3_8", x: 385, y: 315, depth: "fg", baseRadius: 4.2, layer: 3 },
  { id: "n3_9", x: 350, y: 360, depth: "mid", baseRadius: 3.4, layer: 3 },
  { id: "n3_10", x: 390, y: 405, depth: "bg", baseRadius: 2.4, layer: 3 },
  { id: "n3_11", x: 410, y: 125, depth: "bg", baseRadius: 2.0, layer: 3 },
  { id: "n3_12", x: 415, y: 345, depth: "bg", baseRadius: 2.2, layer: 3 },

  // Layer 4: Output / Decision & Policy Nodes (9 nodes)
  { id: "n4_1", x: 470, y: 80, depth: "bg", baseRadius: 2.4, layer: 4 },
  { id: "n4_2", x: 495, y: 130, depth: "mid", baseRadius: 3.2, layer: 4 },
  { id: "n4_3", x: 465, y: 185, depth: "fg", baseRadius: 4.8, layer: 4 },
  { id: "n4_4", x: 510, y: 235, depth: "fg", baseRadius: 4.2, layer: 4 },
  { id: "n4_5", x: 475, y: 285, depth: "fg", baseRadius: 4.5, layer: 4 },
  { id: "n4_6", x: 505, y: 340, depth: "mid", baseRadius: 3.0, layer: 4 },
  { id: "n4_7", x: 460, y: 390, depth: "bg", baseRadius: 2.2, layer: 4 },
  { id: "n4_8", x: 530, y: 175, depth: "bg", baseRadius: 2.0, layer: 4 },
  { id: "n4_9", x: 525, y: 290, depth: "bg", baseRadius: 2.0, layer: 4 },
];

// Rich, organic directed edge set connecting adjacent and bridge layers
const GRAPH_EDGES: GraphEdge[] = [
  // L0 -> L1
  { id: "e0_1", source: "n0_1", target: "n1_1", depth: "bg" },
  { id: "e0_2", source: "n0_1", target: "n1_2", depth: "bg" },
  { id: "e0_3", source: "n0_2", target: "n1_2", depth: "mid" },
  { id: "e0_4", source: "n0_2", target: "n1_3", depth: "mid" },
  { id: "e0_5", source: "n0_3", target: "n1_3", depth: "fg" },
  { id: "e0_6", source: "n0_3", target: "n1_4", depth: "mid" },
  { id: "e0_7", source: "n0_3", target: "n1_5", depth: "fg" },
  { id: "e0_8", source: "n0_4", target: "n1_5", depth: "mid" },
  { id: "e0_9", source: "n0_4", target: "n1_6", depth: "mid" },
  { id: "e0_10", source: "n0_5", target: "n1_6", depth: "fg" },
  { id: "e0_11", source: "n0_5", target: "n1_7", depth: "fg" },
  { id: "e0_12", source: "n0_5", target: "n1_8", depth: "bg" },
  { id: "e0_13", source: "n0_6", target: "n1_9", depth: "bg" },
  { id: "e0_14", source: "n0_7", target: "n1_10", depth: "bg" },
  { id: "e0_15", source: "n0_4", target: "n1_11", depth: "bg" },

  // L1 -> L2
  { id: "e1_1", source: "n1_1", target: "n2_1", depth: "bg" },
  { id: "e1_2", source: "n1_2", target: "n2_1", depth: "bg" },
  { id: "e1_3", source: "n1_2", target: "n2_2", depth: "mid" },
  { id: "e1_4", source: "n1_3", target: "n2_2", depth: "mid" },
  { id: "e1_5", source: "n1_3", target: "n2_3", depth: "fg" },
  { id: "e1_6", source: "n1_3", target: "n2_4", depth: "mid" },
  { id: "e1_7", source: "n1_4", target: "n2_4", depth: "mid" },
  { id: "e1_8", source: "n1_4", target: "n2_14", depth: "bg" },
  { id: "e1_9", source: "n1_5", target: "n2_4", depth: "mid" },
  { id: "e1_10", source: "n1_5", target: "n2_5", depth: "fg" },
  { id: "e1_11", source: "n1_5", target: "n2_6", depth: "fg" },
  { id: "e1_12", source: "n1_6", target: "n2_6", depth: "mid" },
  { id: "e1_13", source: "n1_6", target: "n2_8", depth: "fg" },
  { id: "e1_14", source: "n1_7", target: "n2_7", depth: "mid" },
  { id: "e1_15", source: "n1_7", target: "n2_8", depth: "fg" },
  { id: "e1_16", source: "n1_7", target: "n2_9", depth: "mid" },
  { id: "e1_17", source: "n1_8", target: "n2_10", depth: "mid" },
  { id: "e1_18", source: "n1_9", target: "n2_10", depth: "mid" },
  { id: "e1_19", source: "n1_9", target: "n2_11", depth: "mid" },
  { id: "e1_20", source: "n1_10", target: "n2_12", depth: "bg" },
  { id: "e1_21", source: "n1_10", target: "n2_13", depth: "bg" },

  // L2 Cross-links (Recurrent / Attention-like bridges)
  { id: "e2_c1", source: "n2_3", target: "n2_5", depth: "fg" },
  { id: "e2_c2", source: "n2_5", target: "n2_6", depth: "fg" },
  { id: "e2_c3", source: "n2_6", target: "n2_8", depth: "fg" },
  { id: "e2_c4", source: "n2_8", target: "n2_10", depth: "mid" },
  { id: "e2_c5", source: "n2_4", target: "n2_6", depth: "mid" },
  { id: "e2_c6", source: "n2_7", target: "n2_9", depth: "bg" },
  { id: "e2_c7", source: "n2_8", target: "n2_15", depth: "bg" },

  // L2 -> L3
  { id: "e2_1", source: "n2_1", target: "n3_1", depth: "bg" },
  { id: "e2_2", source: "n2_2", target: "n3_1", depth: "bg" },
  { id: "e2_3", source: "n2_2", target: "n3_2", depth: "mid" },
  { id: "e2_4", source: "n2_3", target: "n3_2", depth: "mid" },
  { id: "e2_5", source: "n2_3", target: "n3_3", depth: "fg" },
  { id: "e2_6", source: "n2_4", target: "n3_3", depth: "mid" },
  { id: "e2_7", source: "n2_4", target: "n3_4", depth: "mid" },
  { id: "e2_8", source: "n2_5", target: "n3_3", depth: "fg" },
  { id: "e2_9", source: "n2_5", target: "n3_5", depth: "fg" },
  { id: "e2_10", source: "n2_6", target: "n3_5", depth: "fg" },
  { id: "e2_11", source: "n2_6", target: "n3_6", depth: "fg" },
  { id: "e2_12", source: "n2_7", target: "n3_5", depth: "mid" },
  { id: "e2_13", source: "n2_8", target: "n3_6", depth: "fg" },
  { id: "e2_14", source: "n2_8", target: "n3_8", depth: "fg" },
  { id: "e2_15", source: "n2_9", target: "n3_7", depth: "mid" },
  { id: "e2_16", source: "n2_9", target: "n3_8", depth: "mid" },
  { id: "e2_17", source: "n2_10", target: "n3_8", depth: "fg" },
  { id: "e2_18", source: "n2_10", target: "n3_9", depth: "mid" },
  { id: "e2_19", source: "n2_11", target: "n3_9", depth: "mid" },
  { id: "e2_20", source: "n2_12", target: "n3_10", depth: "bg" },
  { id: "e2_21", source: "n2_14", target: "n3_11", depth: "bg" },
  { id: "e2_22", source: "n2_15", target: "n3_12", depth: "bg" },

  // L3 -> L4
  { id: "e3_1", source: "n3_1", target: "n4_1", depth: "bg" },
  { id: "e3_2", source: "n3_2", target: "n4_1", depth: "bg" },
  { id: "e3_3", source: "n3_2", target: "n4_2", depth: "mid" },
  { id: "e3_4", source: "n3_3", target: "n4_2", depth: "mid" },
  { id: "e3_5", source: "n3_3", target: "n4_3", depth: "fg" },
  { id: "e3_6", source: "n3_4", target: "n4_3", depth: "mid" },
  { id: "e3_7", source: "n3_5", target: "n4_3", depth: "fg" },
  { id: "e3_8", source: "n3_5", target: "n4_4", depth: "fg" },
  { id: "e3_9", source: "n3_6", target: "n4_4", depth: "fg" },
  { id: "e3_10", source: "n3_6", target: "n4_5", depth: "fg" },
  { id: "e3_11", source: "n3_7", target: "n4_5", depth: "mid" },
  { id: "e3_12", source: "n3_8", target: "n4_5", depth: "fg" },
  { id: "e3_13", source: "n3_8", target: "n4_6", depth: "mid" },
  { id: "e3_14", source: "n3_9", target: "n4_6", depth: "mid" },
  { id: "e3_15", source: "n3_9", target: "n4_7", depth: "bg" },
  { id: "e3_16", source: "n3_10", target: "n4_7", depth: "bg" },
  { id: "e3_17", source: "n3_11", target: "n4_8", depth: "bg" },
  { id: "e3_18", source: "n3_12", target: "n4_9", depth: "bg" },
];

// Pre-defined computational trajectories for subtle, occasional signal flow
const COMPUTATION_TRAJECTORIES: string[][] = [
  ["n0_3", "n1_5", "n2_5", "n3_5", "n4_3"],
  ["n0_2", "n1_3", "n2_3", "n3_3", "n4_2"],
  ["n0_5", "n1_7", "n2_8", "n3_8", "n4_5"],
  ["n0_4", "n1_6", "n2_6", "n3_6", "n4_4"],
  ["n0_3", "n1_3", "n2_5", "n2_6", "n3_5", "n4_4"],
  ["n0_5", "n1_6", "n2_8", "n3_6", "n4_5"],
];

export function ComputationalGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [signalTrajectoryIndex, setSignalTrajectoryIndex] = useState<number>(0);
  const [signalStep, setSignalStep] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Subtle asynchronous background signal propagation (calm and slow)
  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setSignalStep((prevStep) => {
        const currentTrajectory = COMPUTATION_TRAJECTORIES[signalTrajectoryIndex];
        if (prevStep >= currentTrajectory.length - 1) {
          // Pause and advance to next subtle computational path
          setSignalTrajectoryIndex(
            (prevIdx) => (prevIdx + 1) % COMPUTATION_TRAJECTORIES.length
          );
          return 0;
        }
        return prevStep + 1;
      });
    }, 1100); // 1.1s per hop: elegant, slow, non-distracting

    return () => clearInterval(timer);
  }, [signalTrajectoryIndex, reducedMotion]);

  // Track cursor coordinates relative to SVG coordinate space (0-560 x 0-470)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 560;
    const relY = ((e.clientY - rect.top) / rect.height) * 470;
    setMousePos({ x: relX, y: relY });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredNodeId(null);
  };

  // Node map for fast lookups
  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    GRAPH_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  // Connected nodes & edges calculation for interactive hover
  const { connectedNodeIds, connectedEdgeIds } = useMemo(() => {
    if (!hoveredNodeId) {
      return { connectedNodeIds: new Set<string>(), connectedEdgeIds: new Set<string>() };
    }

    const nIds = new Set<string>([hoveredNodeId]);
    const eIds = new Set<string>();

    GRAPH_EDGES.forEach((edge) => {
      if (edge.source === hoveredNodeId) {
        nIds.add(edge.target);
        eIds.add(edge.id);
      } else if (edge.target === hoveredNodeId) {
        nIds.add(edge.source);
        eIds.add(edge.id);
      }
    });

    return { connectedNodeIds: nIds, connectedEdgeIds: eIds };
  }, [hoveredNodeId]);

  const activeSignalNodeId =
    COMPUTATION_TRAJECTORIES[signalTrajectoryIndex]?.[signalStep] || null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[560/460] select-none pointer-events-auto"
      style={{ overflow: "visible" }}
    >
      {/* Very soft atmospheric background glow (no borders, no box) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_48%,rgba(6,182,212,0.045),transparent_72%)] pointer-events-none" />

      <svg
        viewBox="0 0 560 470"
        className="w-full h-full overflow-visible"
        aria-label="Abstract Neural Computational Graph"
        role="img"
      >
        <defs>
          {/* Subtle glow filter for active pulse and foreground focus */}
          <filter id="softNodeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Controlled micro-pulse glow */}
          <filter id="signalPulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4.5" result="signalBlur" />
            <feMerge>
              <feMergeNode in="signalBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. EDGES LAYER */}
        <g className="edges-layer">
          {GRAPH_EDGES.map((edge) => {
            const src = nodeMap.get(edge.source);
            const tgt = nodeMap.get(edge.target);
            if (!src || !tgt) return null;

            const isHoverConnected = connectedEdgeIds.has(edge.id);
            const isDimmed = hoveredNodeId && !isHoverConnected;

            // Check if current subtle signal is traversing this edge
            const currentTrajectory = COMPUTATION_TRAJECTORIES[signalTrajectoryIndex];
            const isSignalEdge =
              currentTrajectory[signalStep] === edge.target &&
              currentTrajectory[signalStep - 1] === edge.source;

            // Proximity calculation to cursor for gentle organic reactiveness
            let proximityBoost = 0;
            if (mousePos && !reducedMotion) {
              const midX = (src.x + tgt.x) / 2;
              const midY = (src.y + tgt.y) / 2;
              const dist = Math.hypot(mousePos.x - midX, mousePos.y - midY);
              if (dist < 80) {
                proximityBoost = (1 - dist / 80) * 0.25;
              }
            }

            // Depth-based subtle styling
            let strokeColor = "#222a3a";
            let strokeWidth = 0.7;
            let strokeOpacity = edge.depth === "fg" ? 0.32 : edge.depth === "mid" ? 0.22 : 0.14;

            if (isHoverConnected) {
              strokeColor = "#00d4ff";
              strokeWidth = 1.3;
              strokeOpacity = 0.85;
            } else if (isSignalEdge) {
              strokeColor = "#38bdf8";
              strokeWidth = 1.1;
              strokeOpacity = 0.7;
            } else if (proximityBoost > 0) {
              strokeColor = "#334155";
              strokeOpacity = Math.min(0.5, strokeOpacity + proximityBoost);
              strokeWidth = 0.85;
            } else if (isDimmed) {
              strokeOpacity = 0.06;
            }

            return (
              <line
                key={edge.id}
                x1={src.x}
                y1={src.y}
                x2={tgt.x}
                y2={tgt.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                className="transition-all duration-700 ease-out"
              />
            );
          })}
        </g>

        {/* 2. NODES LAYER */}
        <g className="nodes-layer">
          {GRAPH_NODES.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isSignalActive = activeSignalNodeId === node.id;
            const isDimmed = hoveredNodeId && !isHovered && !isConnected;

            // Subtle cursor deflection (micro-shift, max 3-4px)
            let shiftX = 0;
            let shiftY = 0;
            let proximityBoost = 0;

            if (mousePos && !reducedMotion) {
              const dx = mousePos.x - node.x;
              const dy = mousePos.y - node.y;
              const dist = Math.hypot(dx, dy);
              if (dist < 100 && dist > 1) {
                proximityBoost = (1 - dist / 100) * 0.3;
                const factor = ((100 - dist) / 100) * 3.5;
                shiftX = (dx / dist) * factor * 0.4;
                shiftY = (dy / dist) * factor * 0.4;
              }
            }

            const currentX = node.x + shiftX;
            const currentY = node.y + shiftY;

            // Radius computation
            let radius = node.baseRadius;
            if (isHovered) radius = node.baseRadius + 2.4;
            else if (isSignalActive) radius = node.baseRadius + 1.8;
            else if (isConnected) radius = node.baseRadius + 1.1;
            else if (proximityBoost > 0) radius = node.baseRadius + proximityBoost * 1.5;

            // Depth-based color & opacity
            let fillColor = "#64748b";
            let fillOpacity = node.depth === "fg" ? 0.65 : node.depth === "mid" ? 0.45 : 0.25;
            let strokeColor = "#334155";
            let strokeWidth = 1;

            if (node.depth === "fg") {
              fillColor = "#38bdf8";
              fillOpacity = 0.75;
              strokeColor = "#0284c7";
            }

            if (isSignalActive) {
              fillColor = "#00d4ff";
              fillOpacity = 1.0;
              strokeColor = "#e0f2fe";
              strokeWidth = 2;
            }

            if (isConnected) {
              fillColor = "#38bdf8";
              fillOpacity = 0.95;
              strokeColor = "#7dd3fc";
            }

            if (isHovered) {
              fillColor = "#00d4ff";
              fillOpacity = 1.0;
              strokeColor = "#ffffff";
              strokeWidth = 2.4;
            }

            if (isDimmed) {
              fillOpacity = 0.08;
              strokeColor = "#1e293b";
            }

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Subtle soft aura for signal or hover */}
                {(isHovered || isSignalActive) && (
                  <circle
                    cx={currentX}
                    cy={currentY}
                    r={radius + 5}
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                    filter="url(#signalPulseGlow)"
                  />
                )}

                {/* Core Node Circle */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r={radius}
                  fill={fillColor}
                  fillOpacity={fillOpacity}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  filter={isHovered || isSignalActive ? "url(#softNodeGlow)" : undefined}
                  className="transition-all duration-500 ease-out"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
