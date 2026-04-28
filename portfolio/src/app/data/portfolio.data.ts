import { Injectable } from '@angular/core';
import { Video, Skill, Course } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

  getVideos(): Video[] {
    return [
      {
        id: 'v1',
        title: 'TypeScript Generics Deep Dive',
        language: 'TypeScript',
        description: 'Master advanced generics, conditional types, and mapped types to write truly type-safe code.',
        duration: '42:15',
        thumbnail: '',
        tags: ['TypeScript', 'Advanced', 'Types'],
        year: 2024
      },
      {
        id: 'v2',
        title: 'Rust Ownership in 30 Minutes',
        language: 'Rust',
        description: 'Finally understand the borrow checker. A visual, practical guide to ownership and lifetimes.',
        duration: '31:08',
        thumbnail: '',
        tags: ['Rust', 'Memory', 'Ownership'],
        year: 2024
      },
      {
        id: 'v3',
        title: 'Python Async/Await Masterclass',
        language: 'Python',
        description: 'From callbacks to coroutines. Build a real-world async web scraper step by step.',
        duration: '58:22',
        thumbnail: '',
        tags: ['Python', 'Async', 'Concurrency'],
        year: 2023
      },
      {
        id: 'v4',
        title: 'Go Channels & Goroutines',
        language: 'Go',
        description: 'Concurrent patterns in Go — pipelines, fan-out, fan-in, and cancellation with context.',
        duration: '37:45',
        thumbnail: '',
        tags: ['Go', 'Concurrency', 'Channels'],
        year: 2024
      },
      {
        id: 'v5',
        title: 'JavaScript Closures Explained',
        language: 'JavaScript',
        description: 'The most misunderstood concept in JS — demystified with real-world examples and gotchas.',
        duration: '24:11',
        thumbnail: '',
        tags: ['JavaScript', 'Closures', 'Fundamentals'],
        year: 2023
      },
      {
        id: 'v6',
        title: 'Zig Memory Management',
        language: 'Zig',
        description: 'Manual memory management without a GC. Allocators, arenas, and comptime magic.',
        duration: '45:33',
        thumbnail: '',
        tags: ['Zig', 'Memory', 'Systems'],
        year: 2024
      },
    ];
  }

  getSkills(): Skill[] {
    return [
      { name: 'TypeScript', category: 'language',   level: 5, icon: '𝙏𝙎' },
      { name: 'Rust',       category: 'language',   level: 4, icon: '🦀' },
      { name: 'Go',         category: 'language',   level: 4, icon: '⚡' },
      { name: 'Python',     category: 'language',   level: 5, icon: '🐍' },
      { name: 'JavaScript', category: 'language',   level: 5, icon: '𝙅𝙎' },
      { name: 'Zig',        category: 'language',   level: 3, icon: '⚙️'  },
      { name: 'Angular',    category: 'framework',  level: 5, icon: '🔺' },
      { name: 'React',      category: 'framework',  level: 4, icon: '⚛️'  },
      { name: 'Node.js',    category: 'framework',  level: 5, icon: '🟢' },
      { name: 'Docker',     category: 'tool',       level: 4, icon: '🐳' },
      { name: 'Git',        category: 'tool',       level: 5, icon: '📦' },
      { name: 'Postgres',   category: 'tool',       level: 4, icon: '🐘' },
      { name: 'WASM',       category: 'concept',    level: 3, icon: '🕸️'  },
      { name: 'Compilers',  category: 'concept',    level: 3, icon: '🔬' },
    ];
  }

  getCourses(): Course[] {
    return [
      {
        id: 'c1',
        title: 'TypeScript from Zero to Hero',
        description: 'Complete TypeScript course — from types basics to advanced patterns used in production.',
        language: 'TypeScript',
        level: 'Beginner',
        totalDuration: '6h 30m',
        color: '#3178c6',
        sections: [
          {
            id: 's1', title: '1. Getting Started', expanded: true,
            lessons: [
              { id: 'l1', title: 'Why TypeScript?',          duration: '8:00',  type: 'video',    completed: true  },
              { id: 'l2', title: 'Setup & tsconfig',         duration: '12:00', type: 'video',    completed: true  },
              { id: 'l3', title: 'Your First Types',         duration: '15:00', type: 'video',    completed: false },
              { id: 'l4', title: 'Types Quiz',               duration: '5:00',  type: 'quiz',     completed: false },
            ]
          },
          {
            id: 's2', title: '2. Interfaces & Types',
            lessons: [
              { id: 'l5', title: 'Interface vs Type Alias',  duration: '18:00', type: 'video',    completed: false },
              { id: 'l6', title: 'Intersection & Union',     duration: '22:00', type: 'video',    completed: false },
              { id: 'l7', title: 'Practice: Shape Library',  duration: '20:00', type: 'exercise', completed: false },
            ]
          },
          {
            id: 's3', title: '3. Generics',
            lessons: [
              { id: 'l8',  title: 'Generic Functions',       duration: '25:00', type: 'video',    completed: false },
              { id: 'l9',  title: 'Conditional Types',       duration: '30:00', type: 'video',    completed: false },
              { id: 'l10', title: 'Mapped Types',            duration: '28:00', type: 'video',    completed: false },
              { id: 'l11', title: 'Build: Type-safe Fetch',  duration: '35:00', type: 'exercise', completed: false },
            ]
          },
        ]
      },
      {
        id: 'c2',
        title: 'Rust Systems Programming',
        description: 'Learn Rust from scratch. Memory safety, ownership, traits, and systems-level programming.',
        language: 'Rust',
        level: 'Intermediate',
        totalDuration: '9h 15m',
        color: '#ce412b',
        sections: [
          {
            id: 's4', title: '1. Ownership Model', expanded: false,
            lessons: [
              { id: 'l12', title: 'Stack vs Heap',           duration: '10:00', type: 'video',    completed: false },
              { id: 'l13', title: 'Move Semantics',          duration: '18:00', type: 'video',    completed: false },
              { id: 'l14', title: 'Borrowing & References',  duration: '22:00', type: 'video',    completed: false },
              { id: 'l15', title: 'Borrow Checker Quiz',     duration: '8:00',  type: 'quiz',     completed: false },
            ]
          },
          {
            id: 's5', title: '2. Traits & Generics',
            lessons: [
              { id: 'l16', title: 'Defining Traits',         duration: '20:00', type: 'video',    completed: false },
              { id: 'l17', title: 'Trait Objects & dyn',     duration: '25:00', type: 'video',    completed: false },
              { id: 'l18', title: 'Generic Bounds',          duration: '22:00', type: 'video',    completed: false },
            ]
          },
        ]
      },
      {
        id: 'c3',
        title: 'Go Concurrency Patterns',
        description: 'Master goroutines, channels, and the sync package to write efficient concurrent Go code.',
        language: 'Go',
        level: 'Advanced',
        totalDuration: '4h 45m',
        color: '#00add8',
        sections: [
          {
            id: 's6', title: '1. Goroutines & Channels', expanded: false,
            lessons: [
              { id: 'l19', title: 'Goroutines Basics',        duration: '14:00', type: 'video',    completed: false },
              { id: 'l20', title: 'Buffered Channels',        duration: '16:00', type: 'video',    completed: false },
              { id: 'l21', title: 'Select Statement',         duration: '18:00', type: 'video',    completed: false },
            ]
          },
          {
            id: 's7', title: '2. Patterns',
            lessons: [
              { id: 'l22', title: 'Pipeline Pattern',         duration: '22:00', type: 'video',    completed: false },
              { id: 'l23', title: 'Fan-out / Fan-in',         duration: '20:00', type: 'video',    completed: false },
              { id: 'l24', title: 'Build: Job Queue',         duration: '40:00', type: 'exercise', completed: false },
            ]
          },
        ]
      },
    ];
  }
}
