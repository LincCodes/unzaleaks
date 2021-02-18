// pages/index.js
const Cosmic = require('cosmicjs')
const api = Cosmic()
// Set these values, found in Bucket > Settings after logging in at https://app.cosmicjs.com/login
const bucket = api.bucket({
  slug: process.env.SLUG,
  read_key: process.env.READ
})

export default function Home({blogs}) {
 
  return (
    <div>
      <div className="heading text-center font-medium text-2xl m-3 text-gray-100">BLOGS</div>
      <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        <div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden border m-4">
        <div class="px-4 py-2">
          <h1 class="text-gray-900 font-bold text-3xl uppercase">NIKE AIR</h1>
          <p class="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p>
        </div>
        <img class="h-56 w-full object-cover mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="NIKE AIR"/>
        <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
          <h1 class="text-gray-200 font-bold text-xl">Admin</h1>
          <button class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">Read more</button>
        </div>
        </div>

      </div>
    </div>
  )
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    type: 'blogs',
    props: 'slug,title,content,metadata.summary,metadata.img,publish_at'
  })
  const blogs = await data.objects
  console.log(blogs)
  return {
    props: {
      blogs,
    }
  }
}
