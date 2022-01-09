import { Container } from "@mui/material"

function Faq(): JSX.Element {
  return (
    <Container>
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
        answer="Not right now, so be sure to double-check your shelves before publishing them!"
      />

      <FaqItem
        question="Can I report a shelf?"
        answer="Yes! If you see something that doesn't look right please let me know (sam@shelf.gg)."
      />
    </Container>
  )
}

interface Props {
  question: string
  answer: string
}

function FaqItem(props: Props): JSX.Element {
  const { question, answer } = props

  return (
    <>
      <h5 className="faq-item-text">
        {question}
      </h5>

      <p className="faq-item-text">
        {answer}
      </p>

      <br/>
    </>
  )
}

export default Faq
