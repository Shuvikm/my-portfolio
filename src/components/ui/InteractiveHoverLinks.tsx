import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface InteractiveHoverLinksProps {
    links?: typeof INTERACTIVE_LINKS;
}

export function InteractiveHoverLinks({
    links = INTERACTIVE_LINKS,
}: InteractiveHoverLinksProps) {
    return (
        <section className="bg-transparent p-4 md:px-8 md:py-8 w-full">
            <div className="mx-auto max-w-5xl">
                {links.map((link, _index) => (
                    <Link key={link.heading} {...link} />
                ))}
            </div>
        </section>
    );
}

interface LinkProps {
    heading: string;
    imgSrc: string;
    subheading: string;
    href: string;
}

function Link({ heading, imgSrc, subheading, href }: LinkProps) {
    const ref = useRef<HTMLAnchorElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
    const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

    const handleMouseMove = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        const rect = ref.current!.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.a
            href={href}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            initial="initial"
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b-2 border-white/20 py-3 transition-all duration-300 hover:border-[#fbbf24] md:py-6"
        >
            <div>
                <motion.span
                    variants={{
                        initial: { x: 0 },
                        whileHover: { x: -16 },
                    }}
                    transition={{
                        type: "spring",
                        staggerChildren: 0.075,
                        delayChildren: 0.25,
                    }}
                    className="relative z-10 block text-3xl font-bold text-white/70 transition-all duration-300 group-hover:text-[#fbbf24] md:text-5xl"
                >
                    {heading.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: { x: 0 },
                                whileHover: { x: 16 },
                            }}
                            transition={{ type: "spring" }}
                            className="inline-block"
                            key={i}
                        >
                            {l}
                        </motion.span>
                    ))}
                </motion.span>
                <span className="relative z-10 mt-1 block text-sm text-white/50 transition-all duration-300 group-hover:text-white/80">
                    {subheading}
                </span>
            </div>

            <motion.img
                style={{
                    top,
                    left,
                    translateX: "-10%",
                    translateY: "-50%",
                }}
                variants={{
                    initial: { scale: 0, rotate: "-12.5deg" },
                    whileHover: { scale: 1, rotate: "12.5deg" },
                }}
                transition={{ type: "spring" }}
                src={imgSrc}
                className="absolute z-0 h-20 w-28 rounded-lg object-cover shadow-lg md:h-40 md:w-56"
                alt={`Image representing ${heading}`}
            />
            <div className="overflow-hidden">
                <motion.div
                    variants={{
                        initial: {
                            x: "100%",
                            opacity: 0,
                        },
                        whileHover: {
                            x: "0%",
                            opacity: 1,
                        },
                    }}
                    transition={{ type: "spring" }}
                    className="relative z-10 p-4"
                >
                    <ArrowRight className="w-6 h-6 text-[#fbbf24] md:w-10 md:h-10" />
                </motion.div>
            </div>
        </motion.a>
    );
}

export const INTERACTIVE_LINKS = [
    {
        heading: "HOME",
        subheading: "Welcome to my portfolio",
        imgSrc: "/images/profile.jpg",
        href: "#home",
    },
    {
        heading: "WHOAMI",
        subheading: "Learn more about me",
        imgSrc: "/images/profile.jpg",
        href: "#about",
    },
    {
        heading: "STACK",
        subheading: "Technologies I work with",
        imgSrc: "/images/profile.jpg",
        href: "#skills",
    },
    {
        heading: "PROJECTS",
        subheading: "Explore my work",
        imgSrc: "/images/grimoire/manga-1.jpg",
        href: "#projects",
    },
    {
        heading: "JOURNEY",
        subheading: "My career path",
        imgSrc: "/images/grimoire/manga-2.jpg",
        href: "#journey",
    },
    {
        heading: "CONTACT",
        subheading: "Get in touch",
        imgSrc: "/images/profile.jpg",
        href: "#contact",
    },
];
