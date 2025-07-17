import Link from "@/components/Link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-24 bg-white p-6 sm:p-12 lg:p-24">
      <div
        id="menubar"
        className="font- flex gap-6 font-mono tracking-tighter sm:gap-14"
      >
        <a href="/">home</a>
        <a href="#about">about</a>
        <a href="#projects">projects</a>
        <a href="#social">social</a>
      </div>
      <div id="hero" className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium">Timo Weiss</h1>
        <div className="flex gap-2">
          <p className="text-base">Software developer working at</p>
          <Link href="https://hmmc.io" title="HMMC" />
        </div>
      </div>
      <div id="about" className="flex flex-col gap-6">
        <h2 className="font-mono text-xl font-medium">about</h2>
        <div className="flex flex-col gap-6 text-base lg:flex-row lg:gap-24">
          <p>
            I love building in the digital and physical world and try to push my
            abilities by starting projects outside of my scope
          </p>
          <p>
            I love building in the digital and physical world and try to push my
            abilities by starting projects outside of my scope
          </p>
        </div>
      </div>
      <div id="projects" className="flex flex-col gap-6">
        <h2 className="font-mono text-xl font-medium">projects</h2>
        <div className="flex flex-col gap-6 text-base lg:flex-row lg:gap-24">
          <div className="flex w-full flex-col gap-6">
            <Link
              href="https://box-grid.timoweiss.me"
              title="Box Grid Generator"
            />
            <Link href="https://gotdoneapp.com" title="Got Done" />
          </div>
          <div className="flex w-full flex-col gap-6">
            <Link
              href="https://domain-generator.timoweiss.me"
              title="Domain Generator"
            />
            <Link
              href="https://blurry-blob-background.timoweiss.me"
              title="Animated Blurry Blob Backgrounds"
            />
          </div>
        </div>
      </div>
      <div id="social" className="flex flex-col gap-6">
        <h2 className="font-mono text-xl font-medium">social</h2>
        <div className="flex gap-14 text-base lg:gap-24">
          <Link href="https://github.com/exddc" title="GitHub" />
          <Link href="https://x.com/timooweiss" title="X" />
          <Link href="https://linkedin.com/in/timoweiss" title="LinkedIn" />
        </div>
      </div>
    </main>
  );
}
