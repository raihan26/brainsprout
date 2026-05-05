# Brainsprout

An interactive learning app for kids in grades K-3. Built for my son to practice core skills at his current grade level and grow with him year over year.

## What it does

- Grade-specific learning activities across Math, Science, Reading, Shapes & Colors, Logic, Life Skills, and a Trucks & Cars fun zone
- Progress tracked per activity with a star system (saved in localStorage)
- Optional voice narration using browser SpeechSynthesis
- No backend, no accounts, no ads, no network calls after initial load

## Tech stack

React + TypeScript + Vite + Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Running tests

```bash
npm test
```

## Project structure

```
src/
  activities/       Learning activities grouped by subject
    math/           Counting, Addition, Subtraction, NumberTracing, NumberOrder
    science/        SinkOrFloat, AnimalHomes, Weather, PlantGrowth, FiveSenses
    reading/        Letters, BeginningSounds, SimpleWords, Rhyming
    shapes/         ShapeMatching, ColorMatching, FindShape, Pattern
    logic/          MemoryMatch, OddOneOut, Sorting, Sequence
    life-skills/    HealthyFood, GoodHabits, Emotions, Safety
    trucks/         NameTheTruck, CountTrucks, TruckMath, TruckSounds, BuildCybertruck, TruckRace
  components/       Reusable UI components
  data/             Section and activity metadata
  hooks/            useProgress, useSpeech
  pages/            Home, SectionPage, ParentDashboard
  utils/            Shuffle, sound effects, storage/progress logic
```

## Design principles

- Large touch targets, high contrast, kid-friendly
- No drag-and-drop (tap-to-place is easier for young kids on touch devices)
- Voice is opt-in, app works fully without it
- All visuals are emoji + inline SVG (no external assets needed)
- Designed to scale: adding a new grade means adding activity data, not rewriting infrastructure
