import { Github } from 'lucide-react';

export default function GithubStats() {

    // Simulating contribution data (normally fetched from API)
    // 0 = no activity, 1 = low, 2 = medium, 3 = high
    const weeks = 20;
    const days = 7;
    const contributionData = Array.from({ length: weeks * days }, () =>
        Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0
    );

    return (
        <section className="py-20 bg-white border-t-4 border-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <h2 className="text-5xl font-black mb-10 uppercase flex items-center justify-center gap-4">
                    <Github className="w-12 h-12" />
                    TRAINING LOG
                </h2>

                <div className="inline-block p-4 border-4 border-black bg-white shadow-[8px_8px_0_black]">
                    <div className="flex gap-1">
                        {Array.from({ length: weeks }).map((_, w) => (
                            <div key={w} className="flex flex-col gap-1">
                                {Array.from({ length: days }).map((_, d) => {
                                    const level = contributionData[w * days + d];
                                    let bgClass = 'bg-gray-100'; // Level 0

                                    if (level === 1) bgClass = 'bg-[url("https://www.transparenttextures.com/patterns/diagmonds-light.png")] bg-gray-300'; // Halftone
                                    if (level === 2) bgClass = 'bg-gray-600';
                                    if (level === 3) bgClass = 'bg-black'; // Max Power

                                    return (
                                        <div
                                            key={d}
                                            className={`w-4 h-4 md:w-6 md:h-6 border border-black transition-transform hover:scale-125 ${bgClass}`}
                                            title={`Level ${level} Activity`}
                                        ></div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-6 text-sm font-bold uppercase">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-black bg-gray-100"></div> Rest Day
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-black bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] bg-gray-300"></div> Light Sparring
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-black bg-black"></div> Serious Series
                    </div>
                </div>

            </div>
        </section>
    );
}
