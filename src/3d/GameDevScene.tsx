export default function GameDevScene() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-spaceBlack">
      <iframe
        title="PS5 DualSense Controller"
        src="https://sketchfab.com/models/0fc4b8409ff84a3e9814ba0f51407281/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_controls=0&ui_infos=0&ui_watermark=0&ui_hint=0"
        className="pointer-events-none w-full h-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
      />
      {/* Premium Vignette/Gradient Overlays to blend iframe edges into spaceBlack (#04020a) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-spaceBlack via-transparent to-spaceBlack opacity-95" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-spaceBlack via-transparent to-spaceBlack opacity-95" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#04020a_95%)]" />
    </div>
  )
}

