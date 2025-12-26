import Breadcrumbs from "@/components/global/breadcrumbs";
import { ArticlePageProps } from "@/const/types";
import { getCachedArticlesPageData } from "@/services/page/article-page-service";
import { generatePageMetadata } from "@/utils/metadata";
import ArticleContent from "./articleContent";

const getArticlePageData = async () => {
  const doc = await getCachedArticlesPageData();
  return await JSON.parse(JSON.stringify(doc));
};

export async function generateMetadata() {
  const articlesPage = await getArticlePageData();
  if (!articlesPage) {
    return generatePageMetadata({
      title: "Articles | Advokattipset.no.no",
      description: "Read expert articles about real estate in Norway",
      path: "/articles",
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
    title: metaTitle || heading || "Articles | Advokattipset.no.no",
    description:
      metaDescription ||
      subHeading ||
      "Welcome to Advokattipset.no.no — compare and find the best real estate agents in Norway.",
    path: "/articles",
    keywords: metaKeywords
      ? metaKeywords
          .split(",")
          ?.map((k: string) => k.trim())
          .filter(Boolean)
      : ["advokattipset", "real estate", "agents", "compare"],
    type: ogType || "website",
    image: metaImage || ogImage || bannerImage || null,
    ogTitle: ogTitle || metaTitle || "Home | Advokattipset.no.no",
    ogDescription:
      ogDescription ||
      metaDescription ||
      "Compare top real estate agents in Norway easily with Advokattipset.no.no.",
    canonicalUrl: canonicalUrl || "/articles",
    robots: robots || "index, follow",
    jsonLd: jsonLd || {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Advokattipset.no.no",
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
