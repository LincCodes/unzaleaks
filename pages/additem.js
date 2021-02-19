import { useForm } from "react-hook-form";

const Cosmic = require('cosmicjs')
const api = Cosmic()

const buckets = api.bucket({
  slug: "unza-leaks-production",
  write_key: "CldAJSUWxLcZVUsWRnnbI802VUVK8783JxzNwDVsjpQXj661bV",
})

export default function Add() {
    const { register, handleSubmit } = useForm();

    const sub = (data) => {

        buckets.addMedia({
          media: data.picture[0],
          folder: '',
        })
        .then(res => {
          buckets.addObject({
            type_slug: "blogs",
            title: data.title,
            metafields: [
              {
                title: 'Img',
                key: 'img',
                type: 'file',
                value: res.media.name
              },
                {
                    title: 'Summary',
                    key: 'summary',
                    type: 'text',
                    value: data.summary
                },
                {
                  title: 'Details',
                  key: 'details',
                  type: 'text',
                  value: data.details
                }
            ],
            options: {
              slug_field: false
            }
          }).then(e=>{
            alert("Added new item, please clear the entry fields to add a new item")
          })
        })
        .catch(err => {
          alert("An error occured")
        })
    }

  return (
    <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(sub)} className="form bg-white p-6 m-4 relative w-11/12 rounded-lg">
            <h3 className="text-2xl text-gray-900 font-semibold">ADD CONTENT</h3>
            <p className="text-gray-600">Adding content</p>
            <label htmlFor="title" className="text-gray-900 block mt-4">Title:</label>
            <input ref={register} id="title" type="text" name="title" placeholder="Write your title..." className="text-gray-900 border p-2 w-full"/>
            <label htmlFor="summary" className="text-gray-900 block mt-4">Summary:</label>
            <input ref={register} type="text" name="summary" id="summary" placeholder="Write your summary..." className="text-gray-900 border p-2 w-full"/>
            <label htmlFor="details" className="text-gray-900 block mt-4">Details:</label>
            <textarea ref={register} name="details" id="details" cols="10" rows="5" placeholder="Write your details.." className="text-gray-900 border p-2 mt-3 w-full"></textarea>
            <input ref={register} name="picture" type="file" className="cursor-pointer relative block w-full h-full mt-4 z-50 text-gray-900"/>
            <input type="submit" value="ADDED" className="w-full mt-6 bg-green-700 hover:bg-green-500 text-white font-semibold p-3"/>
           </form>
  </div>
  );
}