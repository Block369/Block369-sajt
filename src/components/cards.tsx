import Image from "next/image";
import type { Service, TeamMember } from "@/content/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col rounded-xl border border-foreground/10 p-6">
      <h3 className="text-lg tracking-tight">{service.title}</h3>
      <p className="mt-2 text-foreground/70">{service.description}</p>
      {service.points && service.points.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-foreground/70">
          {service.points.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand" aria-hidden>
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function initials(name: string) {
  return name
    .replace(/[[\]]/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({
  member,
  size,
}: {
  member: TeamMember;
  size: number;
}) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={member.name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-brand/10 font-semibold text-brand"
      style={{ width: size, height: size, fontSize: size / 3 }}
    >
      {initials(member.name)}
    </div>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col items-center rounded-xl border border-foreground/10 p-6 text-center">
      <Avatar member={member} size={96} />
      <h3 className="mt-4 ">{member.name}</h3>
      <p className="text-sm text-brand">{member.role}</p>
      <p className="mt-3 text-sm text-foreground/70">{member.bio}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-sm font-medium text-brand hover:underline"
        >
          LinkedIn
        </a>
      )}
    </article>
  );
}
