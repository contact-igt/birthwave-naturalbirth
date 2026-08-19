import Image from "next/image";
import type { TeamMember } from "@/lib/team";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Verified portrait when one exists; otherwise a consistent branded
// initials placeholder — never a stock photo standing in for a real person.
export function TeamAvatar({
  member,
  className = "",
  focal = "center",
}: {
  member: TeamMember;
  className?: string;
  // Most portrait crops are safe at a centered position — only wide/short
  // boxes (e.g. a stacked mobile card) need biasing toward the top so hair
  // isn't trimmed off subjects photographed with little headroom.
  focal?: "center" | "top";
}) {
  if (member.image) {
    return (
      <div className={`relative overflow-hidden rounded-[24px] bg-sky ${className}`}>
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width: 1280px) 320px, 60vw"
          className={`object-cover ${
            member.imageFocal ?? (focal === "top" ? "object-top" : "object-center")
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[24px] bg-blush ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="absolute h-[85%] w-[85%] opacity-60" fill="none">
        {/* head + shoulders — a generic person placeholder, not just a ring */}
        <circle cx="100" cy="78" r="34" stroke="#613E37" strokeWidth="1.5" />
        <path
          d="M42 172c0-34 26-58 58-58s58 24 58 58"
          stroke="#613E37"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="140" cy="52" r="5" fill="#F88379" opacity="0.85" />
      </svg>
      <span className="relative mt-16 font-display text-2xl font-bold text-rose">
        {initials(member.name)}
      </span>
    </div>
  );
}
