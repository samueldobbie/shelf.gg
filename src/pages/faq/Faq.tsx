import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Container } from "@mui/material"

function Faq(): JSX.Element {
  return (
    <Container sx={{ marginTop: "5%" }}>
      <FaqItem
        question="What are shelves?"
        answer="Shelves are collections of related resources."
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
    <Accordion elevation={0} sx={{ marginBottom: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: "bold" }}>
          {question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default Faq
