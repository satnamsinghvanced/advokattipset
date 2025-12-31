import Breadcrumbs from "@/components/global/breadcrumbs";
import { ArtiklerPageProps } from "@/const/types";
import { getCachedRealEstateData } from "@/services/page/real-estate-service";
import { generatePageMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import ArtiklerContent from "./content";
export const dynamic = "force-static";

const getRealestateAgentsData: any = async () => {
  const doc = await getCachedRealEstateData();
  return await JSON.parse(JSON.stringify(doc));
};

export async function generateMetadata(): Promise<Metadata> {
  const realestateAgents = await getRealestateAgentsData();
  if (!realestateAgents) {
    return generatePageMetadata({
      title: "Real Estate Agents | Advokattipset.no",
      description: "Compare and find the best real estate agents in Norway",
      path: "/advokater",
    });
  }
  const {
    metaTitle,
    metaDescription,
    metaKeywords,
    metaImage,
    ogTitle,
    ogDescription,
    canonicalUrl,
    robots,
    jsonLd,
    publishedDate,
    lastUpdatedDate,
    subHeading,
    heading,
    ogImage,
    ogType,
    bannerImage,
  } = realestateAgents;
  return generatePageMetadata({
    title: metaTitle || heading || "Real Estate Agents | Advokattipset.no",
    description:
      metaDescription ||
      subHeading ||
      "Welcome to Advokattipset.no — compare and find the best real estate agents in Norway.",
    path: "/ArtiklerPageProps",
    keywords: metaKeywords
      ? metaKeywords
        .split(",")
        ?.map((k: string) => k.trim())
        .filter(Boolean)
      : ["advokattipset", "real estate", "agents", "compare"],
    type: ogType || "website",
    image: metaImage || ogImage || bannerImage || null,
    ogTitle: ogTitle || metaTitle || "Real Estate Agents | Advokattipset.no",
    ogDescription:
      ogDescription ||
      metaDescription ||
      "Compare top real estate agents in Norway easily with Advokattipset.no.",
    canonicalUrl: canonicalUrl || "/ArtiklerPageProps",
    robots: robots || "index, follow",
    jsonLd: jsonLd || {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Advokattipset.no",
    },
    publishedDate: publishedDate,
    lastUpdatedDate: lastUpdatedDate,
  });
}

const ArtiklerPage = async ({
  searchParams,
}: ArtiklerPageProps) => {
  const params = await searchParams;
  const county = params?.county || "oslo";
  const cp = params?.cp;
  const realestateAgents = await getRealestateAgentsData();

  return (
    <>
      <Breadcrumbs className="mt-8" />
      <ArtiklerContent
        county={county}
        cp={cp}
        realestateAgents={realestateAgents}
      />
    </>
  );
};

export default ArtiklerPage;
