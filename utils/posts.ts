import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postDirectory = path.join(process.cwd(), 'blogposts')
// cwd stand for current working directory '/'

export function getSortedPostData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postDirectory)
    const allPostsData = fileNames.map((fileName) => {
        //Remove '.md' from file name to get id
        const id = fileName.replace(/\.md/, '')

        // Read markdown file as string 
        const fullPath = path.join(postDirectory, fileName)
        const fileContent = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContent)

        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date
        }

        //Combine the data with the id 
        return blogPost
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}