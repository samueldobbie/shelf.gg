import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { useEffect } from 'react'

import Title from '@shelf/helpers/Title'
import './Faq.css'

function Faq(): JSX.Element {
  useEffect(() => {
    document.title = Title.Faq
  })

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol className="faq-column">
          <FaqItem
            question="What are shelves?"
            answer="Shelves are collections of related content that make it easy to share and find resources."
          />

          <FaqItem
            question="How do I create a shelf?"
            answer="Head over to the build page, give your shelf a title, add one or more resources, and hit publish!"
          />

          <FaqItem
            question="What type of resources can I add to a shelf?"
            answer="At the moment you can only add URLs. In the future you'll be able to upload local docs."
          />

          <FaqItem
            question="Do I need an account?"
            answer="Nope!"
          />

          <FaqItem
            question="Can I delete a shelf?"
            answer="Not right now, so double-check your shelves before publishing them. If you accidently include something that doesn't belong in a shelf (e.g. your personal info) then send me a message and I'll do my best to sort it (sam@shelf.gg)."
          />

          <FaqItem
            question="Can I report a shelf?"
            answer="Yes! If you see something that doesn't look right please let me know (sam@shelf.gg)."
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

function FaqItem(props: any): JSX.Element {
  return (
    <>
      <h5 className="faq-item-text">{props.question}</h5>
      <p className="faq-item-text">{props.answer}</p>
      <br/>
    </>
  )
}

export default Faq
