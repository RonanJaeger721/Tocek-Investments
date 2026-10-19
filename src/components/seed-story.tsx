import { ArrowRight } from "lucide-react";
import { Photo, label } from "./ui";

export function SeedStory() {
  return (
    <section className="seed-story" aria-labelledby="seed-story-title">
      <div className="container">
        <div className="seed-story-heading" data-reveal>
          <div>
            {label("A closer perspective")}
            <h2 id="seed-story-title">
              A single seed.
              <br />
              <em>So much ahead.</em>
            </h2>
          </div>
          <p>
            From the detail in a seed to the life in a field.
            <br />
            Agriculture is a story of beginnings.
          </p>
        </div>
        <div
          className="seed-story-gallery"
          tabIndex={0}
          aria-label="Seed to field image gallery. Swipe or use arrow keys to explore."
        >
          <figure className="seed-story-frame seed-story-first">
            <Photo
              name="seed-detail"
              alt="AI-generated illustrative close-up of white maize kernels and a maize cob"
              sizes="(max-width:760px) 85vw, 30vw"
            />
            <figcaption>
              <span>01 / THE SEED</span>
              <h3>Potential, in the detail.</h3>
            </figcaption>
          </figure>
          <figure className="seed-story-frame seed-story-centre">
            <Photo
              name="new-growth"
              alt="AI-generated illustrative maize seedling emerging from agricultural soil at dawn"
              sizes="(max-width:760px) 85vw, 40vw"
            />
            <figcaption>
              <span>02 / NEW GROWTH</span>
              <h3>A beginning takes root.</h3>
            </figcaption>
          </figure>
          <figure className="seed-story-frame seed-story-last">
            <Photo
              name="hero"
              alt="Illustrative photograph of maize growing in evening light"
              sizes="(max-width:760px) 85vw, 30vw"
            />
            <figcaption>
              <span>03 / THE FIELD</span>
              <h3>A wider possibility.</h3>
            </figcaption>
          </figure>
        </div>
        <div className="seed-story-foot">
          <span>AN AGRICULTURAL PERSPECTIVE · ILLUSTRATIVE IMAGERY</span>
          <span className="gallery-swipe">
            Swipe to explore <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </section>
  );
}
