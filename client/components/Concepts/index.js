import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { getConcepts } from 'Utilities/redux/conceptReducer'
import { learningLanguageSelector } from 'Utilities/common'
import Concept from './Concept'

const ConceptTree = ({ concept, showTestConcepts }) => (
  <Concept
    key={concept.concept_id}
    concept={concept}
    showTestConcepts={showTestConcepts}
  >
    {concept.children
      .map(c => (
        <ConceptTree key={c.concept_id} concept={c} showTestConcepts={showTestConcepts} />
      ))}
  </Concept>
)

const Concepts = () => {
  const dispatch = useDispatch()
  const learningLanguage = useSelector(learningLanguageSelector)
  const { concepts, pending } = useSelector(({ concepts }) => concepts)
  const [showTestConcepts, setShowTestConcepts] = useState(false)

  useEffect(() => {
    dispatch(getConcepts(learningLanguage))
  }, [])

  if (pending || !concepts) return <p>loading...</p>

  const makeConceptTree = parents => parents
    .sort((a, b) => a['UI-order'] - b['UI-order'])
    .map((parent) => {
      const children = concepts.filter(c => c.parents && c.parents.includes(parent.concept_id))
      const cleanConcept = {
        ...parent,
        children: makeConceptTree(children),
      }
      return cleanConcept
    })


  const superConcepts = concepts.filter(concept => concept.super)
  const conceptTree = makeConceptTree(superConcepts)

  return (
    <div className="component-container">
      <Form.Group style={{ paddingLeft: '1em' }}>
        <Form.Check
          type="checkbox"
          inline
          checked={showTestConcepts}
          onChange={() => setShowTestConcepts(!showTestConcepts)}
          label="Show test settings"
        />
      </Form.Group>
      <div>
        {conceptTree
          .map(c => (
            <ConceptTree key={c.concept_id} concept={c} showTestConcepts={showTestConcepts} />
          ))}
      </div>
    </div>
  )
}

export default Concepts