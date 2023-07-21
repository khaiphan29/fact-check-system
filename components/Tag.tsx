import React from 'react'
import Image from 'next/image'
import approved from '@/public/assets/icons/tag_approved.svg'
import refute from '@/public/assets/icons/tag_refute.svg'
import neutral from '@/public/assets/icons/tag_neutral.svg'

const Tag = (props: {rating: number}) => {
  const image: any = (props.rating === 1) ? approved : (props.rating === 2) ? refute : neutral
  const bg: string = (props.rating === 1) ? "bg-tag-approved" : (props.rating === 2) ? "bg-tag-refute" : "bg-tag-neutral"
  return (
    <div className={`tag ${bg}`}>
        <Image 
            src={image.src}
            alt='tag'
            width={25}
            height={25} ></Image>
      <p className='tag__title'>{(props.rating === 1) ? "Tin xác thực" : (props.rating === 2) ? "Tin giả" : "Không xác định"}</p>
    </div>
  )
}

export default Tag
