import { SOCIAL_MEDIA_LINKS } from "@/const/consts";
import { FooterProps } from "@/const/types";
import { getCachedFooterData } from "@/services/page/footer-service";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Cta from "../cta";
import LogoText from "../logos/logoText";
import GoTop from "./goTop";

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";

const Footer = async ({ logoText }: FooterProps) => {
  const doc = await getCachedFooterData();
  const FOOTER_DATA = JSON.parse(JSON.stringify(doc));

  const {
    articles,
    places,
    companies,
    exploreLinks,
    socialLinks,
    footerLinks,
    header,
    footerText,
    address,
  } = FOOTER_DATA;

  const addressParts = address?.text
    ?.split(",")
    .map((part: string) => part.trim())
    .filter(Boolean);

  const [company, location, country] = addressParts || [];

  const socialMediaClasses =
    "w-6 h-6 aspect-square text-dark group-hover:text-primary transition-all ease-in-out duration-200";

  return (
    <>
      <Cta header={header} />

      <footer className="bg-footerbg">
        <div className="max-w-7xl px-4 md:px-6 lg:px-8 m-auto grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6 max-md:gap-y-[40px] py-8 sm:py-12 lg:py-20 relative items-baseline">
          <div className="w-fit flex flex-col justify-between h-full max-md:col-span-2">
            <div>
              {logoText ? (
                <Image
                  src={`${imageBaseUrl}${logoText}`}
                  width={120}
                  height={32}
                  alt="Meglertip Logo"
                  className="rounded-2xl"
                  loading="lazy"
                />
              ) : (
                <LogoText />
              )}
            </div>

            <div className="text-background flex gap-2 items-end max-md:hidden">
              {socialLinks?.map((link: any, index: number) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.newPage ? "_blank" : "_self"}
                  className="bg-background p-2 rounded-lg group"
                >
                  {link.icon === "facebook" && (
                    <FaFacebook className={socialMediaClasses} />
                  )}
                  {link.icon === "instagram" && (
                    <FaInstagram className={socialMediaClasses} />
                  )}
                  {link.icon === "linkedin" && (
                    <FaLinkedin className={socialMediaClasses} />
                  )}
                  {link.icon === "youtube" && (
                    <FaYoutube className={socialMediaClasses} />
                  )}
                  {link.icon === "twitter" && (
                    <FaTwitter className={socialMediaClasses} />
                  )}
                  {!SOCIAL_MEDIA_LINKS.includes(link.icon) && (
                    <FaTwitter className="w-6 h-6" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-background/70 text-sm">Artikler</div>
            <div className="flex flex-col gap-2 mt-4 text-background/80">
              {articles?.map((article: any, index: number) => (
                <Link href={article.href} key={index}>
                  {article.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-background/70 text-sm">Steder</div>
            <div className="flex flex-col gap-2 mt-4 text-background/80">
              {places?.map((place: any, index: number) => (
                <Link href={place.href} key={index}>
                  {place.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-background/70 text-sm">Selskaper</div>
            <div className="flex flex-col gap-2 mt-4 text-background/80">
              {companies?.map((company: any, index: number) => (
                <Link href={company.href} key={index}>
                  {company.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <div className="text-background/70 text-sm">Utforske</div>
              <div className="flex flex-col gap-2 mt-4 text-background/80">
                {exploreLinks?.map((link: any, index: number) => (
                  <Link href={link.href} key={index}>
                    {link.text}
                  </Link>
                ))}
              </div>

              <div className="mt-10 max-md:hidden">
                <div className="text-background/80 text-[16px]">
                  {company && `${company},`}
                </div>
                <div className="text-background/80 text-[16px]">
                  {location && `${location},`} {country}
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden max-md:col-span-2">
            <div className="text-background/80 text-[16px]">
              {company && `${company},`}
            </div>
            <div className="text-background/80 text-[16px]">
              {location && `${location},`} {country}
            </div>
          </div>

          <div className="fixed right-4 bottom-4">
            <GoTop />
          </div>
        </div>

        <div className="flex sm:justify-between flex-wrap max-w-7xl m-auto py-6 px-4">
          <div className="text-sm text-background/80">
            {footerText?.map((text: any, index: number) => (
              <span key={index}>{text.text}</span>
            ))}
          </div>

          <div className="text-sm text-background/80 mt-2 sm:mt-0">
            {footerLinks?.map((link: any, index: number) => (
              <span key={index}>
                <Link href={link.href}>{link.text}</Link>
                {index < footerLinks.length - 1 && " | "}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
