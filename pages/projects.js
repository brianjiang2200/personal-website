import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import { Text } from '@nextui-org/react'

import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Brian Jiang',
    tagline: 'Work. Hobby. Open Source.',
    primaryColor: 'yellow',
    secondaryColor: 'pink',
  }

  return { props: meta }
}

function Projects(props) {

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      )
    })
  }

  const { title, image } = props
  const description = `
    I enjoy working on projects that I feel either have a strong use case
    or present a learning opportunity for me. These are some of the different</strong> websites,
    apps, and libraries I contributed to.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://hbjiang.vercel.app/projects" property="og:url" />
        <meta content={`https://hbjiang.vercel.app.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>All Projects</h2>
        {renderAll()}
      </AnimateSharedLayout>
    </>
  )
}

function ProjectItem(props) {
  const { project } = props

  return (
    <li>
      <a href={project.url} target="_blank">
        {project.title}
      </a>
      <Text color="#A9A2A5">{project.description}</Text>
    </li>
  )
}

Projects.Layout = Base

export default Projects
