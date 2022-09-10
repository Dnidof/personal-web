import { gql } from "@apollo/client"

export const GET_POSTS = gql`
    {
        posts {
            id
            title
            sections
            image
            tags
            createdAt
            creator {
                name
                id
            }
            comments {
                id
                content
                createdAt
                likes
                creator {
                    name
                }
            }
        }
    }
`

export const CREATE_POST = gql`
    mutation($title: String!, $sections: [String]!, $image: String!, $creatorId : String!, $createdAt: String!, $tags: [String]!){
            createPost(title: $title, sections: $sections, image: $image, creatorId: $creatorId, createdAt: $createdAt, tags: $tags){
                id
                title
                sections
                tags
                image
                createdAt
            }
    }
`
// export const LIKE_POST = gql`
//     mutation{

//     }
// `

// export const COMMENT_POST = gql`
//     mutation{

//     }
// `

export const CREATE_USER = gql`
    mutation($name: String!, $email: String!, $password: String!, $confirmPassword: String!){
        createUser(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword){
            obj {
                name
                id
                email
                isAdmin
            }
            message
            token
        }
    }
`

export const SIGNIN_USER = gql`
    mutation($name: String!, $password: String!){
        signinUser(name: $name, password: $password){
            obj {
                name
                id
                email
                isAdmin
            }
            message
            token
        }
    }
`
