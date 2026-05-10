import { BASE_URL, SEOData } from '@/src/data/seo';

interface JsonLdProps {
  data: SEOData;
  url: string;
}

export function JsonLd({ data, url }: JsonLdProps) {
  const isPerson = data.schema === 'Person';
  
  const schema = isPerson 
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Constanza Schwartz",
        "url": BASE_URL
      }
    : {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": data.title.split(' | ')[0],
        "creator": {
          "@type": "Person",
          "name": "Constanza Schwartz"
        },
        "image": `${BASE_URL}${data.ogImage}`,
        "url": url
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
