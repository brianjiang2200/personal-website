import React from 'react'
import Head from 'next/head'
import { parseISO, format, intervalToDuration } from 'date-fns'
import { Collapse } from '@nextui-org/react'

import Base from '../layouts/Base'
import Toast from '../components/Toast'
import { Icon } from '../components/Icon'
import stripHtml from '../lib/strip-html'
import resume from '../data/about'
import skills from '../data/skills'

export async function getStaticProps() {
  const meta = {
    title: 'Career // Brian Jiang',
    description: 'The Journey So Far...',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function Career(props) {
  const { title, description, image } = props
  const [toastTitle] = React.useState('')
  const [toastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)

  const renderSkills = () => {
    return (
      <Collapse.Group accordion={false} splitted shadow> 
        {skills.map((item, index) => {
          return (
            <Collapse 
              title={item.category}
              key={index}
              contentLeft={
                <Icon className={item.image} />
              }>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {item.details.map((detail, index) => {
                  return <li key={index}>{detail}</li>
                })}
              </ul>
            </Collapse>
          )}
        )}
      </Collapse.Group>
    )
  }

  const renderExp = () => {
    return resume.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy')
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `
    }

    durationStr += `${durationObj.months} mos`

    return durationStr
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://hbjiang.vercel.app/career" property="og:url" />
        <meta content={`https://hbjiang.vercel.app${image}`} property="og:image" />
      </Head>

      <h2>Things Im Reasonably Good At.</h2>
      {renderSkills()}

      <h2>Experience</h2>
      {renderExp()}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

Career.Layout = Base

export default Career
