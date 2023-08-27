import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Base from '../layouts/Base'
import Toast from '../components/Toast'
import stripHtml from '../lib/strip-html'
import items from '../data/about'

export async function getStaticProps() {
  const meta = {
    title: 'About // Brian Jiang',
    description: 'Software Developer based in Toronto, Canada.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props
  const [toastTitle] = React.useState('')
  const [toastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)

  const renderIntro = () => {
    return (
      <div>
      <Container>
        <Section>
          <Image
            alt="Brian Jiang"
            src="/static/images/hbjiang-sendai.jpg"
            width="316"
            height="346"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>Hey, I'm Brian. </strong>
            I'm a software developer currently based in Kitchener-Waterloo, and
            graduate from UWaterloo in Computer Engineering.
          </Paragraph>
          <Paragraph>
            I am currently a full stack developer at RideCo, a rapidly growing on-demand
            transit startup - paving opportunities to automate support operations with new tooling initiatives. 
            I'm using this crucial time in my career to continue making what I hope to be meaningful contributions,
            while also achieving professional and personal growth.
          </Paragraph>
        </Section>
      </Container>
      <div>
        <Paragraph>
          Software development is rewarding because I enjoy thinking about things high level, and my <strong>approach is modest - 
          I'm always open to new ideas</strong>, so I try to absorb as much knowledge as I can.
          My ideal team works hard and cohesively, but simultaneously enjoys the work and doesn't always take itself too seriously.
          Outside of work, you might find me improving at chess or poker, watching shows with friends, or doing Karaoke.
        </Paragraph>
      </div>
      </div>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
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
        <meta content="https://hbjiang.vercel.app/about" property="og:url" />
        <meta content={`https://hbjiang.vercel.app${image}`} property="og:image" />
      </Head>

      {renderIntro()}

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

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
