interface PageShellProps {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}

/**
 * Layout for the secondary routes. The header sits over a hero on the home page
 * but is opaque elsewhere, so these pages start below its 75px bar.
 */
export function PageShell({ title, intro, children }: PageShellProps) {
  return (
    <main className="min-h-svh bg-white text-black pt-[1.4rem] pb-[0.8rem] px-12 md:px-[0.7rem]">
      <div className="mx-auto w-full max-w-[10.8rem]">
        <h1 className="font-display text-[0.6rem] leading-none font-medium">{title}</h1>
        {intro && <p className="mt-8 md:mt-[0.24rem] text-lg text-black/60 max-w-[6rem]">{intro}</p>}
        {children && <div className="mt-12 md:mt-[0.4rem]">{children}</div>}
      </div>
    </main>
  );
}
