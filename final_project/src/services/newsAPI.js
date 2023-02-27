import axios from 'axios'

export const getNews = async () => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=5ccda305529642c5ba2d9f3ffaf30a55')
        return response.data
    } catch (error) {
        throw error
    }
}
