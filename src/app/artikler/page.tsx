import Breadcrumbs from "@/components/global/breadcrumbs";
import { ArticlePageProps } from "@/const/types";
import { getCachedArticlesPageData } from "@/services/page/article-page-service";
import { generatePageMetadata } from "@/utils/metadata";
import ArticleContent from "./articleContent";


const getArticlePageData = async () => {
  const doc = await getCachedArticlesPageData();
  return await JSON.parse(JSON.stringify(doc));
};
interface PageProps {
  searchParams: {
    page?: string;
  };
}
export async function generateMetadata({ searchParams }: PageProps) {
  const page = await searchParams;
  const articlesPage = await getArticlePageData();
  if (!articlesPage) {
    return generatePageMetadata({
      title: "Artikler | Advokattipset.no",
      description: "Read expert Artikler about real estate in Norway",
      path: "/artikler",
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
  } = articlesPage;
  return generatePageMetadata({
    title: metaTitle || heading || "Artikler | Advokattipset.no",
    description:
      metaDescription ||
      subHeading ||
      "Welcome to Advokattipset.no — compare and find the best real estate agents in Norway.",
    path: "/artikler",
    keywords: metaKeywords
      ? metaKeywords
        .split(",")
        ?.map((k: string) => k.trim())
        .filter(Boolean)
      : ["  advokattipset", "advokat", "artikler"],
    type: ogType || "website",
    image: metaImage || ogImage || bannerImage || null,
    ogTitle: ogTitle || metaTitle || "Home | Advokattipset.no",
    ogDescription:
      ogDescription ||
      metaDescription ||
      "Compare top real estate agents in Norway easily with Advokattipset.no.",
    canonicalUrl: `${page.page ? `${canonicalUrl}?page=${page.page}` : canonicalUrl}` || "/artikler",
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

const ArticlePage = async ({ searchParams }: ArticlePageProps) => {
  const articlesPage = await getArticlePageData();
  return (
    <>
      <Breadcrumbs className="mt-8" />
      <ArticleContent
        searchParams={searchParams}
        title={articlesPage?.title}
        categoriesHeading={articlesPage?.categoriesHeading}
      />
    </>
  );
};

export default ArticlePage;
