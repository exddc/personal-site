import Hero from './components/Hero';
import ShortBio from './components/ShortBio';
import LatestProjects from './components/LatestProjects';

export default function Home() {
    return (
        <div>
            <Hero />
            <ShortBio />
            <LatestProjects />
        </div>
    );
}
