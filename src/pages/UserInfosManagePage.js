import React, { useEffect, useState } from 'react'
import { getUserData } from '../services/userService'

const UserInfosManagePage = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData('qkwBuoEernVFsBDq7bqFrTwa0ru1');
      setUserData(user)
    };
    fetchData()
  }, [])

  // const userData = getUserData("")
  return (
    <div>
      {userData ? (
          <div>
           <p>Nom : {userData.email} </p> 
           <img
            alt='user-logo'
            src={userData.logo}
           />
          </div>
        ) : (
          <div>
            Aucun profil trouvé pour cette ID
          </div>
        )
      }
    </div>
  )
}

export default UserInfosManagePage