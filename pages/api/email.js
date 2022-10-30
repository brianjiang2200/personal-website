import { Klotty } from 'klotty'
const klotty = new Klotty(process.env.KLOTTY_API_KEY)
import EmailTemplate from '../../components/EmailTemplate'

export default async function sendEmail(req, res) {
  try {
    const data = req.body

    await klotty.sendEmail({
      from: 'hbjiang.vercel.app <website@hbjiang.vercel.app>',
      to: 'brian.hb.jiang@gmail.com',
      subject: `${data.name} - via hbjiang.vercel.app`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
