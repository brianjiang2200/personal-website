import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Collapse } from '@nextui-org/react'
import Base from '../layouts/Base'
import Toast from '../components/Toast'
import stripHtml from '../lib/strip-html'
import { pokersrc } from '../data/poker'

export async function getStaticProps() {
  const meta = {
    title: 'Dont Dream. Execute.',
    description: 'What I do in my free time.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Hobbies(props) {
  const { title, description, image } = props
  const [toastTitle] = React.useState('')
  const [toastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)

  const renderChess = () => {
    return (
      <div>
        <Container>
          <Section>
              <Image
                  alt="Washington Intl 2022."
                  src="/static/images/washington-meetup.jpg"
                  width="300"
                  height="400"
                  quality={90}
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
                  Chess has been a mainstay in my life for close to a decade now, and it's been a 
                  source of everything from passion, pride, to frustration and self-doubt. It has been
                  a humbling and grueling journey in the competitive chess world, especially as someone
                  who is considered to have started "late" and balancing their studies. While I consider
                  my achievements in chess to be great during this time (with hopefully more to come!), 
                  one of the most rewarding aspects of being a chess player are the talented friends and 
                  people you'll share experiences with throughout the years.
              </Paragraph>
              <br></br>
              <Paragraph
                css={{
                  marginTop: '16px',
                  '@bp2': { marginTop: '-6px' },
                  }}
              >
                Pictured left: GM Andrew Tang (PenguinGM1) and I (Not a GM) meeting up at the Washington
                Intl. 2022.
              </Paragraph>
          </Section>
        </Container>
        <div>
          <h4>Highlights</h4>
          <Collapse.Group accordion={false} splitted shadow>
            <Collapse
              title="National Master"
              subtitle="Awarded by the Chess Federation of Canada in 2020">
                  <Paragraph>Achieved at the 2020 Canadian University Chess Championship.</Paragraph>
            </Collapse>
            <Collapse 
              title="Canadian Chess Championship / Zonal"
              subtitle="Kingston, Ontario (2022)">
                <Paragraph>
                  My first time playing a tournament with exclusively the best in the country.
                  Managed to place reasonably well, but felt as though I could have
                  done better. Still a great experience, due to the fantastic surprise tournament 
                  win by Yuanchen Zhang - a fellow UWaterloo teammate.
                </Paragraph>
            </Collapse>
            <Collapse
              title="UWaterloo Chess Club"
              subtitle="Main Coordinator, Organizer, and Lecturer">
              <Paragraph>
                Acted as the main coordinator for the club and felt that I did a great job of
                transforming it from a small obscure group to one of the largest clubs on campus
                throughout the pandemic years, as chess began to explode in popularity.
              </Paragraph>
            </Collapse>
          </Collapse.Group>
        </div>
      </div>
    )
  }

  const renderPoker = () => {
    return (
      <div>
        <Container>
          <Paragraph>
            Poker is a discipline of endless patience and self-control. It shows you that achieving results is not only
            about optimizing your technique/strategy, but also about optimizing your lifestyle to make
            that possible. Champions need to behave like champions, on and off the felt.
          </Paragraph>
        </Container>
        <div>
          <h4>Ups and Downs So Far</h4>
          <iframe 
            width="739" height="457" seamless frameborder="0" scrolling="no"
            src={pokersrc}>  
          </iframe>
        </div>
      </div>
    )
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

      <h2>Chess</h2>
      {renderChess()}

      <h2>Poker</h2>
      {renderPoker()}
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

Hobbies.Layout = Base

export default Hobbies
