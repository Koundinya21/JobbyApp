import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="profile-bg-container">
      <img src={profileImageUrl} alt={name} className="img" />
      <h1 className="name">{name}</h1>
      <p className="bio">{shortBio}</p>
    </div>
  )
}

export default Profile
