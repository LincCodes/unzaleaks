import Image from 'next/image'
const Cosmic = require('cosmicjs')
const api = Cosmic()

const bucket = api.bucket({
  slug: "unza-leaks-production",
  read_key: "6iujZzwT2EOvOsEDMyzdJ38cNVK5AN10QC22eCbX7BDMs2j2DA"
})

export async function getServerSideProps(context) {
    const data = await bucket.getObject({
      slug: context.query.id.toString(),
      props: 'slug,title,metadata.img.imgix_url,metadata.details,created' // Limit the API response data by props
    })
    const blog = await data.object
    return {
      props: {
        blog,
      }
    }
  }

export default function Blog({blog}) {
  
  return (
    <div className="flex justify-center items-center">
        <div className="rounded overflow-hidden shadow-2xl m-5">
            <Image layout="responsive" width={500} height={500}  className="w-full" src={blog.metadata.img.imgix_url}/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{blog.title}</div>
                <p className="text-grey-darker text-base">{blog.metadata.details}</p>
            </div>
        </div>
  </div>
  );
}