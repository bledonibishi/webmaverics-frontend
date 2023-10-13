import React, { Dispatch, SetStateAction, useState } from 'react'
// import AnotherAccountImage from '@/assets/images/account-profile-user-circle-gray.svg'
// import RemovaAccountImage from '@/assets/images/account-profile-user-close-cancel.svg'
import { useNavigate } from 'react-router-dom'

const LoginIdentifier = () => {
  const [withPrevious, setWithPrevious] = useState(false)
  const navigate = useNavigate()

  const handleVerify = () => {
    navigate('/login/verify')
  }

  const handleUseAnotherAccount = () => {
    const currentUrl = window.location.href

    const queryString = currentUrl.includes('?') ? '&' : '?'

    window.location.href = `${currentUrl}${queryString}useAnotherAccount=True`
  }

  return (
    <fieldset className="logged-in-accounts">
      <div className="account-item">
        <div className="initials">B</div>
        <input
          type="submit"
          name="email"
          className="btn-transparent account-item-btn"
          id="Email"
          value={'bledonibishi@gmail.com'}
          onClick={() => {
            setWithPrevious(true)
            handleVerify()
          }}
        />
      </div>
      <div className="account-item another-account-item">
        {/* <img src={AnotherAccountImage} alt="" className="user-image" /> */}
        <button
          className="account-item-btn btn-transparent"
          name="button"
          value={'useAnotherAccount'}
          onClick={handleUseAnotherAccount}
        >
          Use another account
        </button>
      </div>
      <div className="account-item another-account-item last-child">
        <a
          className="account-item-btn btn-transparent"
          type="button"
          // value="useAnotherAccount"
          href="/RemoveAccount?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3D80b05d04-adf1-409f-afca-337769ebbdd6%26redirect_uri%3Dhttps%253A%252F%252Fgjirafa50.com%252F%26response_type%3Dcode%26scope%3Dopenid%2520gjirafa50_api%2520profile%2520email%26code_challenge%3DZsP-hScp-KhNWprUhFYC2oIFQjisf8-P__1A7EnHWak%26code_challenge_method%3DS256%26response_mode%3Dform_post%26nonce%3D638309839093842368.NTAyMmJlOTItNTU4Yi00ZDQ0LTgwZmItZDE2MWUwOTAzZjRjNjJlYjgyNGQtNDQwZC00MjQzLTk1MjUtNDVkMjhmNmY1OTEx%26state%3DCfDJ8BavmJPrX4dBnzAs_5ATawynadZmYKEgt6DMN3qM2M9zillQynrYjw34H7a_gnAJ7QfdfQG-FHVM2ZkNOjpMUgJNFL3QO4Le0CauUFSfgowX0tGkoYJgrDkJASE3RRzdsrZWxsytSH6sLQdo9P1ns07dhVfFRYrCp2Avk0-xjJnflX9en5JwODDSPhWptB0djpGDcWMkuFBR0ZclnwKYdVG1liffWYC2SglEYd5augj8JsWy1P7YMyEmXbybxFYaDULK1nFLQzQ0aUjq8ClJuU-ZSKzcPf1FbKfLua6-7GF_eNfoswbGq17Tbcq8MkwzjqQ02iTv_XTQncuByVzJIy6xig06EBzO5mJHD_1hC2UtNEPtmnWLCcP64Cj3EXeZkaF4zHakgv9ASDfCxQ5sg7o%26x-client-SKU%3DID_NETSTANDARD2_0%26x-client-ver%3D6.7.1.0"
        >
          {/* <img src={RemovaAccountImage} className="user-image" /> */}
          Remove an account
        </a>
      </div>
      <div className="plain-text form-item register-link">
        <span>Don't have an account?</span>

        <a
          className="link text-primary"
          defaultValue="register"
          href="/register"
        >
          Register
        </a>
      </div>
    </fieldset>
  )
}

export default LoginIdentifier
