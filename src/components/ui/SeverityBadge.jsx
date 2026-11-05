import { cx, severityTone } from '../../lib/utils'

export default function SeverityBadge({ severity, size = 'md', className }) {
  const tone = severityTone(severity)
  return (
    <span
      className={cx(
        'chip',
        tone.chip,
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : '',
        className,
      )}
    >
      <span className={cx('size-1.5 rounded-full', tone.dot)} />
      {severity}
    </span>
  )
}
