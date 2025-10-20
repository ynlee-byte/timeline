import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anima Project - Next.js",
  description: "A Next.js project converted from React/Vite using the Shadcn UI library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url("https://fonts.googleapis.com/css?family=Bakbak+One:var(--button-big-font-weight),400");

            @font-face {
              font-family: "Ria Sans";
              src: url("YOUR_RIA_SANS_FONT_FILE_URL.woff2") format("woff2"),
                   url("YOUR_RIA_SANS_FONT_FILE_URL.ttf") format("truetype");
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: "Pretendard-Regular";
              src: url("https://anima-uploads.s3.amazonaws.com/projects/681c02510381d3a49b99eb95/fonts/pretendard-regular.otf")
                format("opentype");
            }

            @font-face {
              font-family: "Pretendard-Medium";
              src: url("https://anima-uploads.s3.amazonaws.com/projects/6733f3b89c04f21c988716b9/fonts/pretendard-medium.otf")
                format("opentype");
            }

            @font-face {
              font-family: "Pretendard-SemiBold";
              src: url("https://anima-uploads.s3.amazonaws.com/projects/67616c3af382bd2c4698df42/fonts/pretendard-semibold.otf")
                format("opentype");
            }

            @font-face {
              font-family: "Pretendard-Bold";
              src: url("https://anima-uploads.s3.amazonaws.com/projects/5f06a5517739f30d3a8fc967/fonts/pretendard-bold.otf")
                format("opentype");
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
