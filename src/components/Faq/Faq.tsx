import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import React from 'react'
import './Faq.css'

function Faq() {
  return (
    <MDBContainer>
      <MDBRow className="setup-row">
        <MDBCol className="setup-column">
          <h4>FAQ</h4>
          <hr/>

          <FaqItem
            question="What are shelves?"
            answer="Shelves are collections of related resources, which are used to centralize and keep track of content."
          />

          <FaqItem
            question="How do I create a shelf?"
            answer="Head over to the build page, give your shelf a title, add one or more resources, and hit build!"
          />

          <FaqItem
            question="What type of resources can I add to a shelf?"
            answer="At the moment just urls. Local graphics and docs will be accepted in the future."
          />

          <FaqItem
            question="Do I need an account?"
            answer="Nope!"
          />

          <FaqItem
            question="Is it free?"
            answer="Yep!"
          />

          <FaqItem
            question="Can I delete a shelf?"
            answer="Not yet, so double-check your shelves before publishing them! If you do accidently publish something that doesn't belong in a shelf (e.g. personal info) then send me a message and I'll try to sort it!"
          />
          
          <FaqItem
            question="Can I report a shelf?"
            answer="Yes! This will hopefully be a hub for interesting content and useful resources, so if you see something illegal please let me know (sam@shelf.gg)."
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

function FaqItem(props: any): JSX.Element {
  return (
    <>
      <h5>{props.question}</h5>
      <p>{props.answer}</p>
      <br/>
    </>
  )
}

export default Faq
