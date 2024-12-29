//boilerplat
const pool = require('./pool')

const {PrismaClient} = require('@prisma/client')
const prisma  = new PrismaClient()

//queries
const getUploaderData = async (req, res) => {

const uploaderData = await prisma.users.findUnique({
    where: {
        username: req.user.username,
    },
    include: {
        posts: true
    }
})
return uploaderData
}

const queryAll = async () => {
  const query = await prisma.users.findMany()
  return query
}

const loginUser = async (usernameArg) => {
    const loggedUser = await prisma.users.findUnique({
        where: {
            username: usernameArg,
        },
    })
    return loggedUser
}

const newUser = async (usernameArg, userPasswordArg) => {
    const newUser = await prisma.users.create({
        data: {
            username: usernameArg,
            password: userPasswordArg,
        }
    })
    return newUser
}

const uploadFile = async (reqArg) => {
    const getUploaderData = await prisma.users.findUnique({
        where: {
            username: reqArg.user.username,
        },
    })
    uploaderId = getUploaderData.id

    const userFiles = await prisma.file.create({
        data: {
            title: reqArg.file.filename,
            uploadDate: new Date(),
            uploaderId: uploaderId,
            metadata: reqArg.file
        }
    })
    return userFiles
}

const getUserPosts = async (req, res) => {
    const getUploaderData = await prisma.users.findUnique({
        where: {
            username: req.user.username,
        },
        include: {
            filefolder: true
        }
    })
    uploaderId = getUploaderData.id

    const getPosts = await prisma.file.findMany({
        where: {
            uploaderId: uploaderId
        },
        // include: {
        //     uploader: true
        // }
    })
    return getPosts
}

const getUserFolders = async (req, res) => {
    const uploaderData = await getUploaderData(req)
    const getFolders = await prisma.folder.findMany({
        where: {
            uploaderId: {
                equals: uploaderData.id
            }
        }
    })
    return getFolders
}

const deleteFile = async (req, res) => {
    const uploaderData = await getUploaderData(req)
    const deleteQuery  = await prisma.file.delete({
        where: {
            id: parseInt(req.body.fileId),
            AND: [
                {
                    uploaderId: {
                        equals: uploaderData.id
                    }
                }
            ]
        }
    })
    return deleteQuery
}

const newFolder = async (req, res) => {
    const uploaderData = await getUploaderData(req)
    const newFolder = await prisma.folder.create({
        data: {
            title: req.body.newFolderName,
            creationDate: new Date(),
            uploaderId: uploaderData.id,
            fileContent: []
        }
    }) 
    console.log(uploaderData)
    return newFolder
}

const deleteFolder = async (req, res) => {
    const uploaderData = await getUploaderData(req)
    const folder = await prisma.folder.delete({
        where: {
            id: parseInt(req.body.folderId),
            AND: [
                {
                    uploaderId: {
                        equals: uploaderData.id
                    }
                }
            ]
        }
    })
    return folder
}

const openFolder = async (req, res) => {
    const uploaderData = await getUploaderData(req)
    const folderContents = await prisma.folder.findUnique({
        where: {
            id:  parseInt(req.query.folderId)
        }
    })
    return folderContents
}

const folderInsert = async (req, res) => {
    console.log(req.body.folderInsert)
    console.log(req.body.fileInsert)
    const folderInsert = await prisma.folder.update({
        where: {
            id: parseInt(req.body.folderInsert)
        },
        data: {
            fileContent: {
                push: parseInt(req.body.fileInsert)
            }
        }
    })
    return folderInsert
}

module.exports = {
    queryAll,
    loginUser,
    newUser,
    uploadFile,
    newFolder,
    getUserPosts,
    deleteFile,
    getUserFolders,
    deleteFolder,
    openFolder,
    folderInsert
}

