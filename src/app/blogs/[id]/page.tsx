import BlogDetailsHome from "@/components/blogs/blog-details";

interface Param {
  id: string;
}

async function extractBlogDetails(id: string) {
  const res = await fetch(
    `${process.env.URL}/api/blog-post/blog-details?blogID=${id}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();

  // console.log(data); // Log the API response

  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message || "Failed to fetch blog details");
  }
}


export default async function BlogDetails({ params }: { params: Param }) {
  const { id } = params;

  // console.log("BlogDetails - id:", id);

  const blogData = await extractBlogDetails(id);

  return <BlogDetailsHome blogData={blogData} />;
}



/////////
// "use server"
// // "use client"

// import BlogDetailsHome from "@/components/blogs/blog-details";
// import { Blog } from "@/utils/types";

// interface Param {
//   id: string;
// }

// async function extractBlogDetails(id: string) {
//   const res = await fetch(
//     `${process.env.URL}/api/blog-post/blog-details?blogID=${id}`,
//     {
//       method: "GET",
//       next: {
//         revalidate: 0
//       }
//     }
//   );

//   const data = await res.json();

//   if (data.success) return data.data;
// }

// export default async function BlogDetails({ blogData }: { blogData: Blog }) {
//   // Render your component using blogData
//   return <BlogDetailsHome blogData={blogData} />;
// }

// export async function getServerSideProps({ params }: { params: Param }) {
//   const { id } = params;
//   const blogData = await extractBlogDetails(id);

//   return {
//     props: {
//       blogData
//     }
//   };
// }



