import { applyThemePalette, paletteDots } from "../themePalettes";

function ThemePaletteBar() {
  return (
    <div className="flex justify-center">
      <div className="group">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur-md transition-all duration-300 group-hover:px-6">
          {paletteDots.map((dot) => (
            <button
              key={dot.id}
              type="button"
              aria-label={`Switch theme to ${dot.label}`}
              className="h-4 w-4 rounded-full border border-white/60 shadow-[0_0_12px_rgba(255,255,255,0.22)] transition hover:scale-110"
              style={{ backgroundColor: dot.color }}
              onClick={() => applyThemePalette(dot.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemePaletteBar;
