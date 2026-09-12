interface FilterToggleProps {
  checked: boolean;
  onChange: () => void;
}

export function FilterToggle({
  checked,
  onChange,
}: FilterToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`
        relative
        h-[18px]
        w-[34px]
        shrink-0
        rounded-full
        border-2
        border-accent
        transition-colors
        duration-200

        ${
          checked
            ? "bg-accent"
            : "bg-white"
        }
      `}
    >
      <span
        className={`
          absolute
          top-[2px]
          h-[10px]
          w-[10px]
          rounded-full
          transition-all
          duration-200

          ${
            checked
              ? "left-[18px] bg-white"
              : "left-[2px] bg-accent"
          }
        `}
      />
    </button>
  );
}