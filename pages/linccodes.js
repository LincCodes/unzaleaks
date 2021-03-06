import Link from 'next/link'
const Cosmic = require('cosmicjs')
const api = Cosmic()

const bucket = api.bucket({
  slug: "unza-leaks-production",
  read_key: "6iujZzwT2EOvOsEDMyzdJ38cNVK5AN10QC22eCbX7BDMs2j2DA"
})

export default function Home({ blogs }) {
   return (
    <div>
      <div className="heading text-center font-medium text-2xl m-3 text-gray-100">EDIT YOUR CONTENT</div>
      <Link href="/additem">
        <a className="w-full rounded border block bg-blue-700 text-center hover:bg-blue-500 text-white font-semibold p-3">ADD ITEM</a>
      </Link>
      <div className="holder mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {
          blogs.map((blog)=>{
            return(
            <div key={blog.slug} className="bg-white shadow-lg rounded-lg overflow-hidden border m-4">
            <div className="p-2">
              <h1 className="text-gray-900 font-bold text-2xl uppercase overflow-hidden h-8">{blog.title}</h1>
              <p className="text-gray-600 text-sm my-2 h-10 overflow-hidden">{blog.metadata.summary}</p>
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <Link href="/edit/[id]" as={`/edit/${blog.slug}`} >
              <a className="px-3 py-1 text-sm bg-green-900 font-semibold rounded hover:bg-green-600">Edit</a>
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
    props: 'slug,title,metadata.summary'
  })
  const blogs = await data.objects
  return {
    props: {
      blogs,
    }
  }
}