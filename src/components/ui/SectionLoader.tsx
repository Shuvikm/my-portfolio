export default function SectionLoader() {
    return (
        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#fbbf24] border-t-transparent rounded-full animate-spin" />
            <div className="text-[#fbbf24] font-bold tracking-widest text-sm animate-pulse">LOADING...</div>
        </div>
    );
}
