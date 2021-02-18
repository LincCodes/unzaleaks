import { useForm } from "react-hook-form";
let nanoid = require('nano-id');

const Cosmic = require('cosmicjs')
const api = Cosmic()

export default function Add() {
    const { register, handleSubmit } = useForm();

    const sub = async (data) => {
            const buckets = await api.bucket({
            slug: process.env.SLUG,
            write_key: process.env.WRITE,
          })
          buckets.addObject({
            type_slug: nanoid(12),
            title: data.title,
            status: "published",
            metafields: [
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
                },
                {
                  title: 'img',
                  key: 'img',
                  type: 'file',
                  value: data.picture[0]
                }
            ]
          })
          .then(data => {
              console.log(data)
            alert("Added new Item! Please clear the fields!")
          })
          .catch(err => {
            alert("An error occured!")
          })
    }

  return (
    <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(sub)} className="form bg-white p-6 m-4 relative w-11/12 rounded-lg">
            <h3 className="text-2xl text-gray-900 font-semibold">ADD CONTENT</h3>
            <p className="text-gray-600">Adding content</p>
            <label for="title" className="text-gray-900 block mt-4">Title:</label>
            <input ref={register} id="title" type="text" name="title" placeholder="Write your title..." className="text-gray-900 border p-2 w-full"/>
            <label for="summary" className="text-gray-900 block mt-4">Summary:</label>
            <input ref={register} type="text" name="summary" id="summary" placeholder="Write your summary..." className="text-gray-900 border p-2 w-full"/>
            <label for="details" className="text-gray-900 block mt-4">Details:</label>
            <textarea ref={register} name="details" id="details" cols="10" rows="5" placeholder="Write your details.." className="text-gray-900 border p-2 mt-3 w-full"></textarea>
            <input ref={register} name="picture" type="file" multiple class="cursor-pointer relative block w-full h-full mt-4 z-50 text-gray-900"/>
            <input type="submit" value="ADDED" className="w-full mt-6 bg-green-700 hover:bg-green-500 text-white font-semibold p-3"/>
            
           </form>

  </div>
  );
}