'use client';
import { Bio } from '@/app/components/Bio';
import {
    Announcement,
    AnnouncementTag,
    AnnouncementTitle,
} from '../components/UI/annoucement';

export default function About() {
    return (
        <div className="grid grid-cols-1 gap-36">
            <Bio />
            <section
                id="skils"
                className="text-center max-w-xl mx-auto flex flex-col gap-12 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">Skills</h2>
                <p>
                    I love working with these Languages, Frameworks and
                    Technologies and have experience with them in various
                    Projects.
                </p>
                <div className="flex flex-col gap-1 w-full items-center">
                    <div className="flex flex-row gap-1">
                        <Announcement>
                            <AnnouncementTitle>Swift</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>Python</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>Rust</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>
                                JavaScript / Typescript
                            </AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>SQL</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>C/C++</AnnouncementTitle>
                        </Announcement>
                    </div>
                    <div className="flex flex-row gap-1 w-fit">
                        <Announcement>
                            <AnnouncementTitle>Next.js</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>PostgreSQL</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>SwiftUI</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>React</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>Grafana</AnnouncementTitle>
                        </Announcement>
                    </div>
                    <div className="flex flex-row gap-1 w-fit">
                        <Announcement>
                            <AnnouncementTitle>AWS</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>FastAPI</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>Astro</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>MongoDB</AnnouncementTitle>
                        </Announcement>
                    </div>
                    <div className="flex flex-row gap-1 w-fit">
                        <Announcement>
                            <AnnouncementTitle>Linux</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>Docker</AnnouncementTitle>
                        </Announcement>
                        <Announcement>
                            <AnnouncementTitle>MQTT</AnnouncementTitle>
                        </Announcement>
                    </div>
                </div>
            </section>
        </div>
    );
}
