import type { ComponentType } from "react";
import { BloomFilter } from "@/components/system-design/BloomFilter";
import { LRUCache } from "@/components/system-design/LRUCache";
import { RaftCluster } from "@/components/system-design/RaftCluster";
import { SortingRace } from "@/components/system-design/SortingRace";
import { DijkstraGrid } from "@/components/system-design/DijkstraGrid";
import { OIDCFlow } from "@/components/system-design/OIDCFlow";

export interface LabEntry {
  slug: string;
  title: string;
  category: "Distributed Systems" | "Data Structures" | "Algorithms" | "Security";
  blurb: string;
  caption: string;
  whereUsed?: { label: string; href: string };
  component: ComponentType;
  /** Skill names this lab demonstrates — used to render "▸ try it" chips on Skills cards. */
  skillTags: string[];
}

export const labRegistry: LabEntry[] = [
  {
    slug: "bloom-filter",
    title: "Bloom Filter",
    category: "Data Structures",
    blurb: "Probabilistic set membership in O(k) bits.",
    caption:
      "Type a word — three hash functions flip three bits. Membership checks return 'maybe' or 'definitely not'. Watch the false-positive rate climb as the bit array fills.",
    whereUsed: { label: "Cache stack at Tech Holding", href: "/#projects" },
    component: BloomFilter,
    skillTags: ["DSA", "Redis"],
  },
  {
    slug: "lru-cache",
    title: "LRU Cache",
    category: "Data Structures",
    blurb: "Doubly-linked list + hash map = O(1) eviction.",
    caption:
      "Click any key to access it. Recent keys move to the head; the tail gets evicted when capacity is exceeded.",
    whereUsed: { label: "Session cache layer", href: "/#projects" },
    component: LRUCache,
    skillTags: ["DSA", "Redis", "System Design"],
  },
  {
    slug: "raft-election",
    title: "Raft Leader Election",
    category: "Distributed Systems",
    blurb: "5-node consensus with crash recovery.",
    caption:
      "Click the leader to crash it. Followers time out, vote, and elect a new leader with animated RequestVote RPCs.",
    whereUsed: { label: "Distributed coordination work", href: "/#experience" },
    component: RaftCluster,
    skillTags: ["Distributed Systems", "System Design"],
  },
  {
    slug: "sorting-race",
    title: "Sorting Race",
    category: "Algorithms",
    blurb: "Bubble vs Quick vs Merge — same array, side by side.",
    caption:
      "Three algorithms sort identical inputs. Compare comparison counts and watch the bars settle in real time.",
    component: SortingRace,
    skillTags: ["DSA"],
  },
  {
    slug: "dijkstra",
    title: "Dijkstra Pathfinder",
    category: "Algorithms",
    blurb: "Shortest path on a weighted grid.",
    caption:
      "Click cells to drop walls. Run Dijkstra and watch the visited frontier expand before the shortest path lights up.",
    component: DijkstraGrid,
    skillTags: ["DSA"],
  },
  {
    slug: "oidc-flow",
    title: "OAuth 2.0 / OIDC Flow",
    category: "Security",
    blurb: "Authz-code + PKCE, replay attack, tampered verifier — step by step.",
    caption:
      "Animate the OIDC dance between a browser, client app, authz server (Ory Hydra-style), and resource server. Swap scenarios to see why PKCE matters and how a replayed code gets rejected.",
    whereUsed: { label: "Auth stack at Tech Holding", href: "/#experience" },
    component: OIDCFlow,
    skillTags: ["Security", "System Design"],
  },
];

export function getLabBySlug(slug: string): LabEntry | undefined {
  return labRegistry.find((l) => l.slug === slug);
}

export function getLabsForSkill(skill: string): LabEntry[] {
  return labRegistry.filter((l) => l.skillTags.includes(skill));
}
