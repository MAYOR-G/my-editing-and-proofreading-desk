import { jsonLdScript } from "@/lib/site";

type JsonLdProps = {
  data: unknown;
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}

