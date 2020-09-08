import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { thColor, ThemePart } from "../theme"
import { darken } from "polished"
import Title from "../components/title"
import SEO from "../components/seo"

interface Props {
  data: {
    markdownRemark: {
      timeToRead: number
      frontmatter: {
        title: string
        date: string
      }
      html: string
    }
  }
}

const BlogPostContainer = styled.div``
const BlogPost = styled.div``
const BlogTitle = styled.div`
  h1 {
    font-size: 40px;
    font-weight: bold;
    margin: 0 0 10px 0;
    color: ${thColor(ThemePart.TEXT)};
  }
  h2 {
    font-size: 14px;
    color: ${thColor(ThemePart.TEXT, v => darken(0.3, v))};
    margin: 0 0 38px 0;
  }
`
const BlogPostContent = styled.div``

export const DateAndTimeToRead = ({
  date,
  timeToRead,
}: {
  date: string
  timeToRead: number
}) => (
  <>
    {date} - ⌛ {timeToRead} minute
    {timeToRead > 1 ? "s" : ""} to read
  </>
)

export default ({
  data: {
    markdownRemark: { frontmatter, html, timeToRead },
  },
}: Props) => (
  <>
    <SEO title={frontmatter.title} />
    <Title />
    <BlogPostContainer>
      <BlogPost>
        <BlogTitle>
          <h1>{frontmatter.title}</h1>
          <h2>
            <DateAndTimeToRead
              date={frontmatter.date}
              timeToRead={timeToRead}
            />
          </h2>
        </BlogTitle>
        <BlogPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </BlogPost>
    </BlogPostContainer>
  </>
)

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
      timeToRead
    }
  }
`
