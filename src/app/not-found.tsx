import { ButtonLink, label } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found container">
      {label("404 / A different path")}
      <h1>
        Let’s find
        <br />
        <em>your way back.</em>
      </h1>
      <p>
        The page you’re looking for isn’t here. Explore the seed portfolio or
        return to our homepage.
      </p>
      <div className="inline-actions">
        <ButtonLink href="/">Back to Tocek</ButtonLink>
        <ButtonLink href="/seeds" outline>
          Explore our seeds
        </ButtonLink>
      </div>
    </section>
  );
}
