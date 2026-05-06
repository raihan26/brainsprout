# BrainSprout

An interactive learning app for kids in grades K-3. Built for my son to practice core skills at his current grade level and grow with him year over year.

## What it does

- Grade-specific learning activities across Math, Science, Reading, Shapes & Colors, Logic, Life Skills, and a Trucks & Cars fun zone
- **Kindergarten-focused** with 40+ data-driven activities across 7 learning worlds
- Weekly parent dashboard showing progress, accuracy, skill insights, and recommended practice
- Progress tracked per activity with a star system (localStorage, event-based)
- Optional voice narration using browser SpeechSynthesis
- No backend, no accounts, no ads, no network calls after initial load

## Tech stack

React 18 + TypeScript + Vite + Tailwind CSS + React Router + Vitest

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
  components/       Reusable UI (ActivityShell, AnswerButton, Celebration, ProgressStars, etc.)
  data/             Section/activity metadata, kindergarten questions, skill labels
  hooks/            useProgress, useProgressV2, useSpeech, useGrade
  pages/            Home, SectionPage, ParentDashboard, GradePicker, KindergartenActivity
  utils/            Progress analytics, shuffle, sound effects, legacy storage
```

## Architecture

### Progress tracking (v2)

Event-based progress system in `src/utils/progress.ts`:

- **ActivityAttemptEvent** — recorded on each activity completion (grade, world, stars, duration, accuracy)
- **QuestionAttemptEvent** — recorded per question answered (skill IDs, correctness)
- Pure analytics functions: `getWeeklySummary`, `getWorldProgress`, `getSkillInsights`, `getRecommendedActivities`
- Backward-compatible migration from v1 localStorage format
- Resilient to corrupted/missing localStorage

### Kindergarten activities

Data-driven via `src/data/kindergarten-activity-map.ts`:
- Questions defined in `src/data/kindergarten-questions.ts`
- All activities share the generic `ActivityShell` component
- No per-activity component file needed for quiz-style activities

### Parent dashboard

At `/parent` — shows weekly progress per grade:
- Weekly summary (activities, questions, accuracy, time, stars, active days)
- Subject progress with per-world breakdown
- Skill insights (strong vs needs-practice)
- Recommended next activities
- Activity timeline for the selected week
- Week navigation (prev/next)

## Design principles

- Large touch targets, high contrast, kid-friendly
- No drag-and-drop (tap-to-place is easier for young kids on touch devices)
- Voice is opt-in, app works fully without it
- All visuals are emoji + inline SVG (no external assets needed)
- Designed to scale: adding a new grade means adding activity data, not rewriting infrastructure
- Parent UI is visually distinct (calm, dashboard-like) from child UI (colorful, playful)

## Kindergarten worlds

| World | Activities | Skills |
|-------|-----------|--------|
| Math Garden | Count Objects, Number Recognition, More/Less, Addition, Subtraction, Number Order | counting, number-recognition, addition-within-5, subtraction-within-5, number-order |
| Letter Treehouse | Uppercase, Lowercase, Beginning Sounds, Rhyming, Simple Words, Sight Words | uppercase-letters, lowercase-letters, beginning-sounds, rhyming, cvc-words, sight-words |
| Science Explorers | Sink/Float, Animal Homes, Weather, Five Senses, Plants, Day/Night, Living Things | sink-float, animal-homes, weather, five-senses, plant-growth, day-night, living-nonliving |
| Shapes & Colors | Shapes, Colors, Patterns, Sort Shapes, Real World Shapes | shape-recognition, color-recognition, patterns, sorting, real-world-shapes |
| Logic Playground | Odd One Out, Memory Match, Sequences, Same/Different | odd-one-out, memory, sequences, same-different |
| Daily Life Skills | Healthy Food, Emotions, Safety, Routines, Friendship | healthy-food, emotions, safety, routines, friendship |
| Trucks & Cars | Name, Count, Sounds, Jobs, Size, Math | vehicle-recognition, vehicle-counting, vehicle-sounds, vehicle-jobs, size-comparison |
