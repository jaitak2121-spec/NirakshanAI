import { humanDate } from '../utils/format'

/**
 * One evidence image.
 *
 * Shows the image (a static demonstration asset via `image_url`, or an uploaded
 * data URL via `image_data`), its type and caption, and who recorded it.
 * Synthetic demonstration images carry a badge so they are never mistaken for an
 * official photograph. An image is a record that something was looked at — it is
 * not a finding, and it does not verify the step it sits under.
 */
export default function EvidenceThumb({ item, className = '' }) {
  const src = item.image_url || item.image_data || null
  const when = item.captured_date || item.created_at || null

  return (
    <figure className={`overflow-hidden rounded border border-ink-200 bg-white ${className}`}>
      <div className="relative aspect-[4/3] bg-ink-50">
        {src ? (
          <img
            src={src}
            alt={item.caption || item.evidence_type || 'Evidence image'}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xs text-ink-400">
            Reference only — no image
          </div>
        )}
        {item.is_synthetic && (
          <span className="absolute left-1.5 top-1.5 rounded bg-ink-800/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Synthetic
          </span>
        )}
      </div>

      <figcaption className="space-y-0.5 px-2.5 py-2">
        <div className="text-2xs font-semibold uppercase tracking-wide text-ink-500">
          {item.evidence_type}
        </div>
        {item.caption && <p className="text-[13px] leading-snug text-ink-800">{item.caption}</p>}
        <p className="text-2xs text-ink-400">
          {item.uploaded_by || 'Unknown'}
          {when ? ` · ${humanDate(when)}` : ''}
          {item.reference ? ` · Ref: ${item.reference}` : ''}
        </p>
      </figcaption>
    </figure>
  )
}
