import { test } from '../Services/Jobs.js'

const getJobs = async (req, res) => {

    res.status(200).json({ text: test() })

    
}


export { getJobs }