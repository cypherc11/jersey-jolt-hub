import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  product?: {
    name: string;
    price: number;
    currency: string;
    image: string;
    brand: string;
    availability: 'in_stock' | 'out_of_stock';
  };
}

export function SEOHead({ 
  title, 
  description, 
  image, 
  url = window.location.href,
  type = 'website',
  product 
}: SEOHeadProps) {
  const siteName = "Jersey Jolt Hub";
  const fullTitle = `${title} - ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD Structured Data */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.image,
            "description": description,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "offers": {
              "@type": "Offer",
              "price": product.price,
              "priceCurrency": product.currency,
              "availability": `https://schema.org/${product.availability === 'in_stock' ? 'InStock' : 'OutOfStock'}`,
              "seller": {
                "@type": "Organization",
                "name": siteName
              }
            }
          })}
        </script>
      )}
    </Helmet>
  );
}