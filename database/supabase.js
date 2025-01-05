
require('dotenv').config()
const { createClient } = require("@supabase/supabase-js")
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

console.log(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

const fetchData = async () => {
    const buckets = { data, error } = await supabase
    .storage
    .listBuckets()
    return buckets
}

// const uploadData = async (fileData) => {
//     const file = {data, error} = await supabase.storage.from('generalStorage').upload('file_path', fileData)
//     return file
// }

const downloadData = async () => {
    const file = {data, error} = supabase
        .storage
        .from('generalStorage')
        .download('download.jpeg')
    return file
}

const uploadData = async (body) => {
    const buckets = { data, error } = await supabase
    .storage
    .from('generalStorage')
    .upload('generalStorage', body)
    return buckets
}

console.log(fetch('./uploads/3d3313c6e629623c69d8e73988c28d43'))
// console.log(fetchData().then(console.log))
console.log(uploadData('../uploads/3d3313c6e629623c69d8e73988c28d43').then(console.log))
// console.log(createBucket().then(console.log))
// console.log(downloadData().then(console.log))


module.exports = {
    fetchData,
    uploadData,
    downloadData
}