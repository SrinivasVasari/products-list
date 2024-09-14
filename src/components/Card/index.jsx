import React, {useState} from 'react'
import './index.css'

export const Card = ({...props}) => {
    const { title, image,  price, description } = props
    const [expanded, setExpanded] = useState(false)

    let rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });
    const linkName = expanded ? 'Read less <<' : 'Read more >>'
    return (
        <div className='card' tabindex="0" role='list'>
            <div className='card_image'>
                 <img src={image} alt={title} />
            </div>
                    <div className='card_content' role='listItem'>
                        <h4 className='card_title' role='listItem'>
                            {title?.substring(0, 20)}
                        </h4>
                        <h3 className='card_price' role='listItem'>
                            {rupee.format(price)}
                        </h3>
                        <div className='card_description' role='listItem'>
                            {description.substring(0,35)}{expanded && description.substring(35, description?.length)}<a className='readMore-link' onClick={() => setExpanded(!expanded)}>{' '} {linkName}</a>
                        </div>
                    </div>
        </div>
    )

}
