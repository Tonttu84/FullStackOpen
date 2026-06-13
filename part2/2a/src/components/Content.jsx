import {Course} from './Course'


const SiteHeader = ({content}) =>{
	return(
		<h1>{content}</h1>
	)
}

export const Content = ({ content }) => {
	return (
	  <>
		<SiteHeader content = "Web development Curriculum" />
		{content.map(blaa => (
		  <Course key={blaa.id} course={blaa} />
		))}
	  </>
	)
  }
