import Link from 'next/link'
const Cosmic = require('cosmicjs')
const api = Cosmic()

const bucket = api.bucket({
  slug: process.env.SLUG,
  read_key: process.env.READ
})

export default function Home({ blogs }) {
   return (
    <div>
      <div className="heading text-center font-medium text-2xl m-3 text-gray-100">BLOGS</div>
      <div className="holder mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {
          blogs.map((blog)=>{
            return(
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border m-4">
            <div className="p-2">
              <h1 className="text-gray-900 font-bold text-2xl uppercase">{blog.title}</h1>
              <p className="text-gray-600 text-sm my-2 h-10">{blog.metadata.summary}</p>
            </div>
            <img className="h-56 w-full object-cover mt-2" src={blog.metadata.img.imgix_url} alt="NIKE AIR"/>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <p className="text-gray-200 font-bold text">{new Date(blog.created).toLocaleDateString()}</p>
              <Link href="/blog/[id]" as={`/blog/${blog.slug}`} >
              <a className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded hover:bg-gray-400">Read more</a>
              </Link>
            </div>
            </div>
            )
          })
        }

      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await bucket.getObjects({
    type: 'blogs',
    props: 'slug,title,metadata.img.imgix_url,metadata.summary,created' // Limit the API response data by props
  })
  const blogs = await data.objects
  return {
    props: {
      blogs,
    }
  }
}