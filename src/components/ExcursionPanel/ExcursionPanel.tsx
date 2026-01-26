import { useState } from "react";
import type { HeritageFeatureSummary } from "../../types/heritageObj/HeritageFeatureSummary";

interface ExcursionPanelProps {
  isActive: boolean;
  items: HeritageFeatureSummary[];
  onToggleActive: () => void;
  onRemoveItem: (id: string) => void;
  onClearItems: () => void;
}

export function ExcursionPanel({
  isActive,
  items,
  onToggleActive,
  onRemoveItem,
  onClearItems,
}: ExcursionPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`absolute right-4 z-10 w-80 ${
        isOpen ? "top-4 bottom-4" : "top-20"
      }`}
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-md hover:bg-form-hover"
        >
          Пройти екскурсію
        </button>
      ) : (
        <div
          className={`flex h-full flex-col rounded-2xl bg-white shadow-md ${
            isActive ? "ring-2 ring-accent" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-2 px-4 pt-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-black">
                Пройти екскурсію
              </h3>
              <p className="text-xs text-black/60">
                {isActive
                  ? "Клікайте по обʼєктах на мапі, щоб додати їх до списку."
                  : "Увімкніть добір, щоб додавати обʼєкти до екскурсії."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-black/60 hover:text-black"
                aria-label="Згорнути"
              >
                ✕
              </button>
            </div>
          </div>
        <button
            type="button"
            onClick={onClearItems}
            className="text-xs font-medium text-accent hover:text-black disabled:opacity-50"
            disabled={items.length === 0}
            >
            Очистити список
        </button>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {items.length === 0 ? (
              <p className="text-sm text-black/60">
                Список порожній. Додайте обʼєкти для маршруту.
              </p>
            ) : (
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-2 rounded-xl bg-black/5 px-3 py-2"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-black">
                        {item.name}
                      </p>
                      <p className="text-xs text-black/60">
                        {item.displayStatus.label}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-accent hover:text-black"
                    >
                      Видалити
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-black/5 px-4 py-3">
            <button
              type="button"
              onClick={onToggleActive}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white"
                  : "bg-accent text-white hover:bg-accent/90"
              }`}
            >
              {isActive ? "Завершити добір" : "Додати обʼєкти"}
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl px-3 py-2 text-sm font-medium text-black bg-form-hover hover:accent disabled:opacity-50"
              disabled={items.length === 0}
            >
              Пройти екскурсію
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
