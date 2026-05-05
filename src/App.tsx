import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SectionPage from './pages/SectionPage';
import ParentDashboard from './pages/ParentDashboard';
// Math
import Counting from './activities/math/Counting';
import Addition from './activities/math/Addition';
import Subtraction from './activities/math/Subtraction';
import NumberTracing from './activities/math/NumberTracing';
import NumberOrder from './activities/math/NumberOrder';
// Science
import SinkOrFloat from './activities/science/SinkOrFloat';
import AnimalHomes from './activities/science/AnimalHomes';
import Weather from './activities/science/Weather';
import PlantGrowth from './activities/science/PlantGrowth';
import FiveSenses from './activities/science/FiveSenses';
// Reading
import Letters from './activities/reading/Letters';
import BeginningSounds from './activities/reading/BeginningSounds';
import SimpleWords from './activities/reading/SimpleWords';
import Rhyming from './activities/reading/Rhyming';
// Shapes & Colors
import ShapeMatching from './activities/shapes/ShapeMatching';
import ColorMatching from './activities/shapes/ColorMatching';
import FindShape from './activities/shapes/FindShape';
import Pattern from './activities/shapes/Pattern';
// Logic
import MemoryMatch from './activities/logic/MemoryMatch';
import OddOneOut from './activities/logic/OddOneOut';
import Sorting from './activities/logic/Sorting';
import Sequence from './activities/logic/Sequence';
// Life skills
import HealthyFood from './activities/life-skills/HealthyFood';
import GoodHabits from './activities/life-skills/GoodHabits';
import Emotions from './activities/life-skills/Emotions';
import Safety from './activities/life-skills/Safety';
// Trucks
import NameTheTruck from './activities/trucks/NameTheTruck';
import CountTrucks from './activities/trucks/CountTrucks';
import TruckMath from './activities/trucks/TruckMath';
import TruckSounds from './activities/trucks/TruckSounds';
import BuildCybertruck from './activities/trucks/BuildCybertruck';
import TruckRace from './activities/trucks/TruckRace';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parent" element={<ParentDashboard />} />
      <Route path="/:sectionId" element={<SectionPage />} />

      <Route path="/math/counting" element={<Counting />} />
      <Route path="/math/addition" element={<Addition />} />
      <Route path="/math/subtraction" element={<Subtraction />} />
      <Route path="/math/tracing" element={<NumberTracing />} />
      <Route path="/math/order" element={<NumberOrder />} />

      <Route path="/science/sink-or-float" element={<SinkOrFloat />} />
      <Route path="/science/animal-homes" element={<AnimalHomes />} />
      <Route path="/science/weather" element={<Weather />} />
      <Route path="/science/plant" element={<PlantGrowth />} />
      <Route path="/science/senses" element={<FiveSenses />} />

      <Route path="/reading/letters" element={<Letters />} />
      <Route path="/reading/sounds" element={<BeginningSounds />} />
      <Route path="/reading/words" element={<SimpleWords />} />
      <Route path="/reading/rhyming" element={<Rhyming />} />

      <Route path="/shapes/shapes" element={<ShapeMatching />} />
      <Route path="/shapes/colors" element={<ColorMatching />} />
      <Route path="/shapes/find" element={<FindShape />} />
      <Route path="/shapes/pattern" element={<Pattern />} />

      <Route path="/logic/memory" element={<MemoryMatch />} />
      <Route path="/logic/odd-one-out" element={<OddOneOut />} />
      <Route path="/logic/sorting" element={<Sorting />} />
      <Route path="/logic/sequence" element={<Sequence />} />

      <Route path="/life/food" element={<HealthyFood />} />
      <Route path="/life/habits" element={<GoodHabits />} />
      <Route path="/life/emotions" element={<Emotions />} />
      <Route path="/life/safety" element={<Safety />} />

      <Route path="/trucks/name" element={<NameTheTruck />} />
      <Route path="/trucks/count" element={<CountTrucks />} />
      <Route path="/trucks/math" element={<TruckMath />} />
      <Route path="/trucks/sounds" element={<TruckSounds />} />
      <Route path="/trucks/build" element={<BuildCybertruck />} />
      <Route path="/trucks/race" element={<TruckRace />} />
    </Routes>
  );
}
