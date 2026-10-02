import EvidenceThumb from './EvidenceThumb'

const NOTE =
  'Images marked “Synthetic” are illustrative demonstration placeholders, not photographs of any real work. Officer-added evidence is attributed to the officer who recorded it. An image records that something was looked at; it is not a finding.'

/**
 * A compact grid of evidence images for a work.
 *
 * Additive to the existing Project Detail page. Renders whatever evidence has
 * been recorded against the work — seeded synthetic demonstration images, plus
 * anything an officer attached during an investigation — and falls back to a
 * plain empty state when there is none, so a record with no images still renders.
 */
export default function EvidenceGallery({ evidence = [], title = 'Site & evidence images', note = NOTE }) {
  const items = evidence || []

  return (
    <section className="panel">
      <div className="panel-header">
        <h3 className="panel-title">{title}</h3>
        <span className="tnum text-2xs text-ink-500">
          {items.length} image{items.length === 1 ? '' : 's'}
        </span>
      </div>
      <div className="p-4">
        {items.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-ink-500">No evidence images available.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              {items.map((item) => (
                <EvidenceThumb key={item.id ?? `${item.evidence_type}-${item.caption}`} item={item} />
              ))}
            </div>
            <p className="mt-3 text-2xs leading-relaxed text-ink-400">{note}</p>
          </>
        )}
      </div>
    </section>
  )
}
