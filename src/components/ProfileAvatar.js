import React from 'react'
import { Avatar } from 'rsuite'
import { getNameInitials } from '../misc/Helpers'

const ProfileAvatar = ({name, ...avatarProps}) => {
  return ( // <Avatar> is an rsuite component that we'll use to put initials as dp if no pic is there
    <Avatar circle {...avatarProps}>{
    getNameInitials(name)
}
    </Avatar>
  )
}

export default ProfileAvatar
