import Hero from './components/Hero';
import ShortBio from './components/Bio';
import LatestProjects from './components/LatestProjects';
import Links from './components/Links';

export default function Home() {
    return (
        <div className="grid grid-cols-1 gap-64">
            <div className="h-[95vh] flex flex-col gap-[20vh] items-center justify-center">
                <Hero />
                <ShortBio />
            </div>
            <LatestProjects />
            <Links />
        </div>
    );
}
