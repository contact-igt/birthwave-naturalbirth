import Image from "next/image";

// Primary Birthwave logo — dark calligraphy on a large transparent canvas.
// The artwork occupies roughly the centre 50% of the square PNG, so we render
// the image much larger than the visible container and clip the excess padding
// with overflow-hidden, effectively "zooming in" on the logo content.
export function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  if (size === "sm") {
    return (
      <div className="relative h-[80px] w-[210px] overflow-hidden flex items-center justify-center">
        <Image
          src="/images/logo.PNG"
          alt="The Birth Wave – By Dr. Santoshi Nandigam"
          width={900}
          height={900}
          className="absolute left-1/2 top-[52%] w-[310px] -translate-x-1/2 -translate-y-1/2 object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative h-[120px] w-[300px] overflow-hidden flex items-center justify-center">
      <Image
        src="/images/logo.PNG"
        alt="The Birth Wave – By Dr. Santoshi Nandigam"
        width={800}
        height={800}
        className="absolute left-1/2 top-[52%] w-[460px] -translate-x-1/2 -translate-y-1/2 object-contain"
        priority
      />
    </div>
  );
}
