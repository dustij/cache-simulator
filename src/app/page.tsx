import { Container } from "@/components/Container";
import Image from "next/image";

export default function Home() {
    return (
        <Container className="mt-9">
            <div className="font-[family-name:var(--font-geist-sans)] max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                    Cache Simulator
                </h1>
                <main className=""></main>
                <footer className=""></footer>
            </div>
        </Container>
    );
}
