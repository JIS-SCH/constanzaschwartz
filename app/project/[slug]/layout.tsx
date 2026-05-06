import { Metadata } from 'next';
import { PROJECT_SEO, BASE_URL } from '@/src/data/seo';
import { JsonLd } from '@/src/components/layout/JsonLd';

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = PROJECT_SEO[slug];

  if (!data) return {};

  const url = `${BASE_URL}/project/${slug}`;
  const imageUrl = `${BASE_URL}${data.ogImage}`;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      title: data.title,
      description: data.description,
      url: url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectLayout({ params, children }: Props) {
  const { slug } = await params;
  const data = PROJECT_SEO[slug];
  const url = `${BASE_URL}/project/${slug}`;

  return (
    <>
      {data && <JsonLd data={data} url={url} />}
      {children}
    </>
  );
}
