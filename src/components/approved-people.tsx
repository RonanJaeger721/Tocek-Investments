// Unpublished components. Never render without explicit company/family approval.
import Image from "next/image";
export type ApprovedLeader = {
  name: string;
  title: string;
  biography: string;
  portrait: string;
  approved: true;
  status: "current";
};
export type ApprovedLegacy = {
  name: string;
  role: string;
  portrait: string;
  tribute: string;
  dates?: string;
  companyApproved: true;
  familyApproved: true;
};
export function Leadership({ people }: { people: ApprovedLeader[] }) {
  if (!people.length) return null;
  return (
    <section className="container approved-leadership">
      <h2>Leadership & governance</h2>
      {people
        .filter((p) => p.approved && p.status === "current")
        .map((p) => (
          <article key={p.name}>
            <Image src={p.portrait} width={480} height={600} alt={p.name} />
            <h3>{p.name}</h3>
            <span>{p.title}</span>
            <p>{p.biography}</p>
          </article>
        ))}
    </section>
  );
}
export function Legacy({ person }: { person: ApprovedLegacy | null }) {
  if (!person?.companyApproved || !person.familyApproved) return null;
  return (
    <section className="container approved-legacy">
      <span>In remembrance</span>
      <Image src={person.portrait} width={480} height={600} alt={person.name} />
      <h2>{person.name}</h2>
      <p>{person.role}</p>
      {person.dates && <span>{person.dates}</span>}
      <p>{person.tribute}</p>
    </section>
  );
}
