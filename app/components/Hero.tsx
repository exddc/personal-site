'use client';

import ScrambleIn from './Fancy-Scramble-In';

export default function Hero() {
    return (
        <div id="hero" className="mx-auto w-fit text-center my-24">
            <h1 className="italic font-serif text-5xl">Timo Weiss</h1>
            <ScrambleIn
                text="Software Developer at HMMC"
                className="font-light tracking-tighter"
            />
        </div>
    );
}
