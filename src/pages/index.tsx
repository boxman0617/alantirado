import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Intro from "../components/intro"
import PostLink, { Post } from "../components/post-link"
import Title from "../components/title"
import styled from "styled-components"

const PostsContainer = styled.div`
  margin-top: 35px;
`

interface Node extends Post {
  id: string
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: { node: Node }[]
    }
  }
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: Props) => (
  <>
    <SEO title="Home" />
    <Title />
    <Intro />
    <PostsContainer>
      {edges.map(edge => (
        <PostLink key={edge.node.id} post={edge.node} />
      ))}
    </PostsContainer>
  </>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
          timeToRead
        }
      }
    }
  }
`
