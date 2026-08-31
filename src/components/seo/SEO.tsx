import { Helmet } from "react-helmet-async"

interface SEOProps {
  title?: string
  description?: string
  name?: string
  type?: string
  url?: string
}

export function SEO({
  title = "Moova | Reliable Delivery & Logistics",
  description = "Moova offers seamless, real-time tracking and delivery solutions for your business and personal needs.",
  name = "Moova",
  type = "website",
  url = "https://moova-web.codemash.co.tz/",
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
