import ContentfulImage from "../lib/contentful-image";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BusinessImage({
  title,
  url,
  slug,
}: {
  title: string;
  url: string;
  slug?: string;
}) {
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      width={500}
      height={250}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {image}
    </div>
  );
}
