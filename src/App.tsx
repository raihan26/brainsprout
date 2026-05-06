import { Route, Routes } from 'react-router-dom';
import GradePicker from './pages/GradePicker';
import Home from './pages/Home';
import SectionPage from './pages/SectionPage';
import ParentDashboard from './pages/ParentDashboard';
import KindergartenActivity from './pages/KindergartenActivity';
// Legacy activities kept for grade 1-3 (they still use the old QuestionRunner)
import Counting from './activities/math/Counting';
import Addition from './activities/math/Addition';
import Subtraction from './activities/math/Subtraction';
import NumberTracing from './activities/math/NumberTracing';
import NumberOrder from './activities/math/NumberOrder';
import SinkOrFloat from './activities/science/SinkOrFloat';
import AnimalHomes from './activities/science/AnimalHomes';
import Weather from './activities/science/Weather';
import PlantGrowth from './activities/science/PlantGrowth';
import FiveSenses from './activities/science/FiveSenses';
import Letters from './activities/reading/Letters';
import BeginningSounds from './activities/reading/BeginningSounds';
import SimpleWords from './activities/reading/SimpleWords';
import Rhyming from './activities/reading/Rhyming';
import ShapeMatching from './activities/shapes/ShapeMatching';
import ColorMatching from './activities/shapes/ColorMatching';
import FindShape from './activities/shapes/FindShape';
import Pattern from './activities/shapes/Pattern';
import MemoryMatch from './activities/logic/MemoryMatch';
import OddOneOut from './activities/logic/OddOneOut';
import Sorting from './activities/logic/Sorting';
import Sequence from './activities/logic/Sequence';
import HealthyFood from './activities/life-skills/HealthyFood';
import GoodHabits from './activities/life-skills/GoodHabits';
import Emotions from './activities/life-skills/Emotions';
import Safety from './activities/life-skills/Safety';
import NameTheTruck from './activities/trucks/NameTheTruck';
import CountTrucks from './activities/trucks/CountTrucks';
import TruckMath from './activities/trucks/TruckMath';
import TruckSounds from './activities/trucks/TruckSounds';
import BuildCybertruck from './activities/trucks/BuildCybertruck';
import TruckRace from './activities/trucks/TruckRace';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GradePicker />} />
      <Route path="/parent" element={<ParentDashboard />} />

      {/* Grade-prefixed routes */}
      <Route path="/:grade" element={<Home />} />
      <Route path="/:grade/:sectionId" element={<SectionPage />} />

      {/* Kindergarten new data-driven activities */}
      <Route path="/k/:worldId/:activitySlug" element={<KindergartenActivity />} />

      {/* Legacy routes for grades 1-3 (and backward compat for K) */}
      <Route path="/:grade/math/counting" element={<Counting />} />
      <Route path="/:grade/math/addition" element={<Addition />} />
      <Route path="/:grade/math/subtraction" element={<Subtraction />} />
      <Route path="/:grade/math/tracing" element={<NumberTracing />} />
      <Route path="/:grade/math/order" element={<NumberOrder />} />

      <Route path="/:grade/science/sink-or-float" element={<SinkOrFloat />} />
      <Route path="/:grade/science/animal-homes" element={<AnimalHomes />} />
      <Route path="/:grade/science/weather" element={<Weather />} />
      <Route path="/:grade/science/plant" element={<PlantGrowth />} />
      <Route path="/:grade/science/senses" element={<FiveSenses />} />

      <Route path="/:grade/reading/letters" element={<Letters />} />
      <Route path="/:grade/reading/sounds" element={<BeginningSounds />} />
      <Route path="/:grade/reading/words" element={<SimpleWords />} />
      <Route path="/:grade/reading/rhyming" element={<Rhyming />} />

      <Route path="/:grade/shapes/shapes" element={<ShapeMatching />} />
      <Route path="/:grade/shapes/colors" element={<ColorMatching />} />
      <Route path="/:grade/shapes/find" element={<FindShape />} />
      <Route path="/:grade/shapes/pattern" element={<Pattern />} />

      <Route path="/:grade/logic/memory" element={<MemoryMatch />} />
      <Route path="/:grade/logic/odd-one-out" element={<OddOneOut />} />
      <Route path="/:grade/logic/sorting" element={<Sorting />} />
      <Route path="/:grade/logic/sequence" element={<Sequence />} />

      <Route path="/:grade/life/food" element={<HealthyFood />} />
      <Route path="/:grade/life/habits" element={<GoodHabits />} />
      <Route path="/:grade/life/emotions" element={<Emotions />} />
      <Route path="/:grade/life/safety" element={<Safety />} />

      <Route path="/:grade/trucks/name" element={<NameTheTruck />} />
      <Route path="/:grade/trucks/count" element={<CountTrucks />} />
      <Route path="/:grade/trucks/math" element={<TruckMath />} />
      <Route path="/:grade/trucks/sounds" element={<TruckSounds />} />
      <Route path="/:grade/trucks/build" element={<BuildCybertruck />} />
      <Route path="/:grade/trucks/race" element={<TruckRace />} />
    </Routes>
  );
}
