import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { DateAndTimeToRead } from "../templates/blog-post"
import { thColor, Theme, ThemePart } from "../theme"
import { darken, lighten } from "polished"

export interface Post {
  frontmatter: { slug: string; title: string; date: string }
  timeToRead: number
}

interface Props {
  post: Post
}

const PostLinkContainer = styled.div`
  a {
    font-size: 22px;
    margin-bottom: 6px;
  }
`
const DateAndTimeToReadContainer = styled.div`
  font-size: 14px;
  color: ${thColor(ThemePart.TEXT, (v, { type }) =>
    type === Theme.DARK ? darken(0.2, v) : lighten(0.2, v)
  )};
`

const PostLink = ({ post }: Props) => (
  <PostLinkContainer>
    <Link to={post.frontmatter.slug}>{post.frontmatter.title} </Link>
    <DateAndTimeToReadContainer>
      <DateAndTimeToRead
        date={post.frontmatter.date}
        timeToRead={post.timeToRead}
      />
    </DateAndTimeToReadContainer>
  </PostLinkContainer>
)

export default PostLink
