export default function Header() {
    return (
        <header className="max-w-2xl w-full mx-auto pt-4">
            <nav className="flex flex-row justify-between items-center h-[43px] px-1.5 text-base tracking-tight text-black whitespace-nowrap border border-gray-200 border-solid bg-neutral-50 rounded-[50px] noise">
                <a
                    href="/"
                    className="text-center pt-[2px] bg-white rounded-3xl border border-solid border-neutral-50 shadow-[1px_2px_2px_rgba(0,0,0,0.38)] w-[100px] h-[31px] text-base tracking-tighter"
                >
                    Home
                </a>
                <a
                    href="/"
                    className="text-center pt-[2px] bg-white rounded-3xl border border-solid border-neutral-50 shadow-[1px_2px_2px_rgba(0,0,0,0.38)] w-[100px] h-[31px] text-base tracking-tighter"
                >
                    Work
                </a>
                <a
                    href="/"
                    className="text-center pt-[2px] bg-white rounded-3xl border border-solid border-neutral-50 shadow-[1px_2px_2px_rgba(0,0,0,0.38)] w-[100px] h-[31px] text-base tracking-tighter"
                >
                    Links
                </a>
                <a
                    href="/"
                    className="text-center pt-[2px] bg-white rounded-3xl border border-solid border-neutral-50 shadow-[1px_2px_2px_rgba(0,0,0,0.38)] w-[100px] h-[31px] text-base tracking-tighter"
                >
                    About
                </a>
            </nav>
        </header>
    );
}
