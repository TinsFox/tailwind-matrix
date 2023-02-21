import { Mdx } from "components/mdx";
import { allDocs } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";

// export async function generateStaticParams() {
//   // const posts = allPosts.sort((a, b) => {
//   //   return compareDesc(new Date(a.date), new Date(b.date));
//   // });
//   return allDocs;
// }

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export default function DocsPage({ params }: DocPageProps) {
  console.log("DocsPage params", params);

  const doc = allDocs[0];
  console.log(doc);
  // useLiveReload();
  const MDXContent = useMDXComponent(doc.body.code || "");
  console.log(MDXContent);

  return (
    <div>
      docs
      {MDXContent && <MDXContent code={MDXContent as any}></MDXContent>}
    </div>
  );
}
