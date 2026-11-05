import { asset, cx } from '../../lib/utils'

export default function Logo({ theme = 'dark', size = 'md', className }) {
  const sizes = {
    sm: { mark: 'size-8 rounded-xl', name: 'text-[17px]', sub: 'text-[7px]' },
    md: { mark: 'size-10 rounded-2xl', name: 'text-xl', sub: 'text-[8px]' },
    lg: { mark: 'size-12 rounded-2xl', name: 'text-2xl', sub: 'text-[9px]' },
  }
  const s = sizes[size]
  const light = theme === 'light'

  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <img
        src={asset('/icons/icon.svg')}
        alt=""
        className={cx(s.mark, 'shrink-0 shadow-soft ring-1 ring-black/10')}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'font-display font-extrabold tracking-[-0.03em]',
            s.name,
            light ? 'text-cream-50' : 'text-forest-950',
          )}
        >
          Agro<span className={light ? 'text-forest-300' : 'text-forest-600'}>Gen</span>
        </span>
        <span
          className={cx(
            'mt-1 font-semibold uppercase tracking-[0.34em]',
            s.sub,
            light ? 'text-cream-100/60' : 'text-forest-900/45',
          )}
        >
          Precision
        </span>
      </span>
    </span>
  )
}
