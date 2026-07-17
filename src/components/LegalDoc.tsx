export interface LegalSection {
  heading: string;
  /** One entry per paragraph. */
  body: string[];
}

interface LegalDocProps {
  updated: string;
  sections: LegalSection[];
}

/** Shared reading layout for the policy pages — a narrow column of headed sections. */
export function LegalDoc({ updated, sections }: LegalDocProps) {
  return (
    <div className="max-w-[7.2rem]">
      <p className="text-[0.24rem] md:text-sm text-black/40">Last updated {updated}</p>

      <div className="mt-[0.5rem] md:mt-[0.32rem] space-y-12 md:space-y-[0.4rem]">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-[0.4rem] md:text-[0.2rem]">{section.heading}</h2>
            <div className="mt-[0.2rem] md:mt-[0.16rem] space-y-[0.2rem] md:space-y-[0.12rem] text-[0.28rem] md:text-base leading-relaxed text-black/60">
              {section.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
