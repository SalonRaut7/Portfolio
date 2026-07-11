import Image from "next/image";

export default function HeroArt() {
  return (
    <figure className="art">
      <div className="art__glow" aria-hidden="true" />
      <Image
        className="art__img"
        src="/person.jpg"
        alt="Line-art illustration of a developer coding at a dual-monitor setup"
        width={1200}
        height={1600}
        priority
        sizes="(max-width: 980px) 70vw, 420px"
      />
    </figure>
  );
}
