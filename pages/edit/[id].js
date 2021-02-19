import { useState } from "react";
const Cosmic = require('cosmicjs')
const api = Cosmic()

const bucket = api.bucket({
  slug: process.env.SLUG,
  read_key: process.env.READ,
})

export async function getServerSideProps(context) {

    const data = await bucket.getObject({
      slug: context.query.id.toString(),
      props: 'slug,title,metadata.summary,metadata.details,metafields[0].value'
    })

    const blog = await data.object

    return {
      props: {
        blog,
      }
    }
  }

export default function Edit({blog}) {
    const [title, settitle] = useState(blog.title)
    const [sum, setsum] = useState(blog.metadata.summary)
    const [det, setdet] = useState(blog.metadata.details)
    const [img, setimg] = useState(blog.metafields[0].value)
    
    async function sub(e) {
        e.preventDefault()
        const buckets = await api.bucket({
          slug: "unza-leaks-production",
          write_key: "CldAJSUWxLcZVUsWRnnbI802VUVK8783JxzNwDVsjpQXj661bV",
        })

        buckets.editObject({
          slug: blog.slug,
          title: title,
          metafields: [
            {
              title: 'Img',
              key: 'img',
              type: 'file',
              value: img
            },
              {
                  title: 'Summary',
                  key: 'summary',
                  type: 'text',
                  value: sum
              },
              {
                title: 'Details',
                key: 'details',
                type: 'text',
                value: det
              }
          ]
        })
        .then(data => {
          alert("Updated!")
        })
        .catch(err => {
          alert("An error occured!")
        })
    }
  return (
    <div className="flex flex-col justify-center items-center">
        <form onSubmit={sub} className="form bg-white p-6 m-4 relative w-11/12 rounded-lg">
            <h3 className="text-2xl text-gray-900 font-semibold">EDITING</h3>
            <p className="text-gray-600">Edit the blog you selected</p>
            <label htmlFor="title" className="text-gray-900 block mt-4">Title:</label>
            <input id="title" type="text" name="title"value={title} onChange={(e)=> settitle(e.target.value)} placeholder="Write your title..." className="text-gray-900 border p-2 w-full"/>
            <label htmlFor="summary" className="text-gray-900 block mt-4">Summary:</label>
            <input type="text" name="summary" id="summary" value={sum} onChange={(e)=> setsum(e.target.value)} placeholder="Write your summary..." className="text-gray-900 border p-2 w-full"/>
            <label htmlFor="details" className="text-gray-900 block mt-4">Details:</label>
            <textarea name="details" id="details" cols="10" value={det} onChange={(e)=> setdet(e.target.value)} rows="5" placeholder="Write your details.." className="text-gray-900 border p-2 mt-3 w-full"></textarea>
            <img className="w-full mt-2" src={`https://imgix.cosmicjs.com/${img}`} alt="Sunset in the mountains"/>
            <input type="submit" value="UPDATE" className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"/>
           </form>
  </div>
  );
}