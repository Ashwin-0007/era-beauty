import type { FilterTabItem } from '../../types/ui'

export type { FilterTabItem }

export interface FilterTabsProps<T extends string = string> {
  tabs: readonly FilterTabItem<T>[] | FilterTabItem<T>[]
  activeTab: T
  onChange: (tabId: T) => void
  className?: string
  size?: 'sm' | 'md'
}

export function FilterTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
  size = 'md',
}: FilterTabsProps<T>) {
  const sizeClasses =
    size === 'sm'
      ? 'px-3.5 py-1.5 text-[0.68rem]'
      : 'px-4 py-2 text-xs'

  return (
    <div
      role="tablist"
      aria-label="Filtres"
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      {tabs.map((tab) => {
        const isSelected = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.id)}
            className={`rounded-full font-medium tracking-wider transition-all duration-300 ${sizeClasses} ${
              isSelected
                ? 'border border-oxblood bg-oxblood text-ivory shadow-sm'
                : 'border border-ink/15 bg-ivory/60 text-ink/70 hover:border-ink/30 hover:bg-cream/60 hover:text-ink'
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={`ml-1.5 text-[0.62rem] opacity-75 ${
                  isSelected ? 'text-ivory' : 'text-ink/60'
                }`}
              >
                ({tab.count})
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
