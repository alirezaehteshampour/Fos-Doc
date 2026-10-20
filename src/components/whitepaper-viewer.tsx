import { withBasePath } from '../../site.config.mjs';

export function WhitepaperViewer() {
    const pdfUrl = withBasePath('/whitepaper.pdf');
    return (
        <section aria-label="Current FOS whitepaper">
            <p className="flex flex-wrap gap-4">
                <a href={pdfUrl} target="_blank" rel="noreferrer">Open whitepaper PDF</a>
                <a href={pdfUrl} download="FOS-Whitepaper.pdf">Download PDF</a>
                <a href={withBasePath('/whitepaper.tex')} download="FOS-Whitepaper.tex">Download LaTeX source</a>
            </p>
            <iframe
                src={pdfUrl}
                className="w-full h-[800px] border rounded-lg shadow-lg mt-4"
                title="FOS Whitepaper PDF"
                loading="lazy"
            />
            <p className="text-sm text-muted-foreground mt-2">
                If your browser cannot display the embedded PDF, use Open whitepaper PDF or Download PDF above.
            </p>
        </section>
    );
}
