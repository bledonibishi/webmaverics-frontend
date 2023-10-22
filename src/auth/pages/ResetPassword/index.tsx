import React from 'react'

const ResetPassword = () => {
  return (
    <div className="auth-main-container">
      <div className="auth-wrapper">
        <link href="/sign.css" rel="stylesheet"></link>
        <link href="/Identifier.css" rel="stylesheet"></link>
        <div className="alert-wrapper error fade-in "></div>
        <div className="auth-page auth-inner">
          <div className="sign-register active">
            <div className="main-title">
              <a>
                <img
                  src="https://tojnhu4mvp.gjirafa.net/profilepictures/Erk3fL5+XJTopw2dI5KVI9FK+pVHkxMPijlZx7hJrKg=/115386261.4195841.png"
                  className="logo-main"
                />
              </a>
              <h6 className="subtitle">Reset password</h6>
              <p className="plain-text mt-3">
                Your new password must be different from previous used password.
              </p>
            </div>
            <form id="resetPasswordForm" className="form-horizontal">
              <input
                type="hidden"
                id="Code"
                name="Code"
                value="Q2ZESjhPak1ZaHhZa1U1T3FiN2xzcW5XT2Fldm81RU8vZXdwbnUra2VCMHBoMk1JcThyNGtIQjBDQTczK0FXN2Q3ZkxlaDdEVVRlYWJud1VDWTdPcC9ZVklQMnJZSVJzVmpHTStDdFEwaVR4dmIzTVZqOVRRbXRnWDdKQ00ya1dGandGdXBpQVBqSys2ZVVTeTVnTFhNL1B5WkxhL1kxWFZ5d3pMRFJIM3YzT1dZbzNuZjMwcWwxL3ZMUlhUejhKREJOYUdPMzZmVUNYNTMvM3dMWEJzZnJDdGNlZkFjek9uZE9qcjFIS1ZJdS9TY0ZQVEhVdTlIbzJjcUJyVU4zNHlTc2l0dz09"
              />
              <input
                type="hidden"
                id="ReturnUrl"
                name="ReturnUrl"
                value="/connect/authorize/callback?client_id=80b05d04-adf1-409f-afca-337769ebbdd6&amp;redirect_uri=https%3A%2F%2Fgjirafa50.com%2F&amp;response_type=code&amp;scope=openid%20gjirafa50_api%20profile%20email&amp;code_challenge=cDNsw3lpwpIkLznIShJ9dEqy7r0Qh6_k61d9Wudy5_I&amp;code_challenge_method=S256&amp;response_mode=form_post&amp;nonce=638334795330148298.ZjBkZDkxODYtMDljZS00ZjFmLWJlNzMtYTg4NGZmMzFmZDRiYmJjY2ViNDAtNTQxZS00YWNhLTgzOWYtNGNjNzRjN2Y4MjVk&amp;state=CfDJ8BavmJPrX4dBnzAs_5ATawxv9FGZyuLEIJyUc7N1iYUhWtGYb8q_oGKmQZvTh5xNRf2Shm5J2YWNvmG4lTrVd7xMRvVIPopLK-uAHXGZ4-n94CtlYMLPOP-v5q6XrZVA3x5Q-PJNOEaxQ2bBi2yMA_onx1SpiwrbOPPdon_3rhg0qpi139rdaB5DdwSAmCuZ25q2xdBeQilaz_hifSBOuVW4WEZ--3bww5eOOoDn0-LiNFm7YohEt9hRp3j-TYYpqFjTbx_fi4Bg4VZdIh1ug-2_ZO8Cqdbgrt3Xzi2urDAJr4ri4Z3Scmtw20WQSo6-cNTD0UCHt7kE7ywNdue_eiVRasmJmh3vfkitgRv2LuXHFSgBoh9fNMvQQ74Nj-BynKdFGCaQ5k6vviIFV5x6aHA&amp;x-client-SKU=ID_NETSTANDARD2_0&amp;x-client-ver=6.15.1.0"
              />
              <input
                type="hidden"
                data-val="true"
                data-val-required="The IsSentFromAdmin field is required."
                id="IsSentFromAdmin"
                name="IsSentFromAdmin"
                value="False"
              />
              <input
                type="hidden"
                value="908b88a2-1319-4091-8164-7b9792b15fbc"
                id="UrlId"
                name="UrlId"
              />
              <input
                type="hidden"
                value="bledonibishi1@gmail.com"
                data-val="true"
                data-val-email="The Email field is not a valid e-mail address."
                data-val-required="Email is required."
                id="Email"
                name="Email"
              />
              <input
                type="hidden"
                value="Bledon"
                id="FirstName"
                name="FirstName"
              />
              <input
                type="hidden"
                value="Ibishi"
                id="LastName"
                name="LastName"
              />
              <input
                type="hidden"
                name="RequiredLength"
                id="requiredLength"
                value="8"
              />
              <div className="form-item">
                <input
                  id="psw-input"
                  className="form-control checkCapsLock"
                  placeholder=" "
                  data-val-required="Password is required."
                  type="password"
                  data-val="true"
                  name="Password"
                  aria-autocomplete="list"
                />
                {/* // onkeyup="IsCapsLockOn(event)"  */}
                <span
                  className="error-message mt-1 field-validation-valid"
                  data-valmsg-for="Password"
                  data-valmsg-replace="true"
                ></span>
                <span className="capsLock info-tooltip bottom">
                  Caps lock ON
                </span>
                <span className="show-pass show_pw">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pw-shown"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.49616 9.37578C3.54698 9.47839 3.62199 9.62144 3.72241 9.79201C3.93762 10.1576 4.26685 10.6449 4.72135 11.1309C5.62889 12.1015 7.01771 13.0508 8.99979 13.0508C10.9819 13.0508 12.3707 12.1015 13.2783 11.1309C13.7327 10.6449 14.062 10.1576 14.2772 9.79201C14.3776 9.62143 14.4526 9.47839 14.5035 9.37578C14.4526 9.27317 14.3776 9.13013 14.2772 8.95956C14.062 8.59401 13.7327 8.10669 13.2783 7.62063C12.3707 6.65006 10.9819 5.70078 8.99979 5.70078C7.01771 5.70078 5.62889 6.65006 4.72135 7.62063C4.26685 8.10669 3.93762 8.594 3.72241 8.95956C3.62199 9.13013 3.54698 9.27317 3.49616 9.37578ZM14.9998 9.37578C15.4153 9.20309 15.4153 9.20289 15.4152 9.20268L15.4144 9.20089L15.4129 9.19719L15.4078 9.18537C15.4036 9.17556 15.3976 9.16192 15.3898 9.14472C15.3743 9.11031 15.3518 9.06159 15.3219 9.00059C15.2622 8.87867 15.1731 8.7073 15.0528 8.50294C14.8126 8.09506 14.4454 7.55112 13.9356 7.00593C12.9146 5.914 11.3034 4.80078 8.99979 4.80078C6.69616 4.80078 5.08499 5.914 4.06396 7.00593C3.55418 7.55113 3.18698 8.09506 2.94684 8.50295C2.82653 8.7073 2.73742 8.87867 2.67771 9.0006C2.64783 9.06159 2.62526 9.11031 2.60977 9.14472C2.60202 9.16192 2.59604 9.17556 2.5918 9.18537L2.58674 9.19719L2.58518 9.20089L2.58464 9.20218C2.58455 9.20239 2.58426 9.20309 2.9998 9.37578L2.58426 9.20309C2.53832 9.31363 2.53832 9.43793 2.58426 9.54847L2.9998 9.37578C2.58426 9.54847 2.58417 9.54826 2.58426 9.54847L2.58464 9.54938L2.58518 9.55067L2.58674 9.55437L2.5918 9.56619C2.59604 9.576 2.60202 9.58964 2.60977 9.60684C2.62526 9.64125 2.64783 9.68997 2.67771 9.75097C2.73742 9.87289 2.82653 10.0443 2.94684 10.2486C3.18698 10.6565 3.55418 11.2004 4.06396 11.7456C5.08499 12.8376 6.69616 13.9508 8.99979 13.9508C11.3034 13.9508 12.9146 12.8376 13.9356 11.7456C14.4454 11.2004 14.8126 10.6565 15.0528 10.2486C15.1731 10.0443 15.2622 9.87289 15.3219 9.75097C15.3518 9.68997 15.3743 9.64125 15.3898 9.60685C15.3976 9.58964 15.4036 9.57601 15.4078 9.5662L15.4129 9.55438L15.4144 9.55067L15.415 9.54939C15.4151 9.54917 15.4153 9.54848 14.9998 9.37578ZM14.9998 9.37578L15.4153 9.54848C15.4613 9.43793 15.4611 9.31323 15.4152 9.20268L14.9998 9.37578ZM6.83552 9.37578C6.83552 8.19993 7.82087 7.27578 8.9998 7.27578C10.1787 7.27578 11.1641 8.19993 11.1641 9.37578C11.1641 10.5516 10.1787 11.4758 8.9998 11.4758C7.82087 11.4758 6.83552 10.5516 6.83552 9.37578ZM8.9998 8.17578C8.28519 8.17578 7.73552 8.7291 7.73552 9.37578C7.73552 10.0225 8.28519 10.5758 8.9998 10.5758C9.71442 10.5758 10.2641 10.0225 10.2641 9.37578C10.2641 8.7291 9.71442 8.17578 8.9998 8.17578Z"
                      fill="#667C99"
                    ></path>
                  </svg>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pw-hidden"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.25221 8.54215L7.10348 9.39342C6.80741 9.64105 6.53845 9.89985 6.29538 10.1598C5.68939 10.8079 5.25042 11.4576 4.96347 11.945C4.82957 12.1725 4.72957 12.3632 4.6618 12.5C4.72957 12.6368 4.82957 12.8275 4.96347 13.055C5.25042 13.5424 5.68939 14.1921 6.29538 14.8402C7.50543 16.1343 9.3572 17.4 12 17.4C12.9892 17.4 13.8676 17.2227 14.643 16.9329L15.5623 17.8523C14.5495 18.3064 13.3661 18.6 12 18.6C8.92847 18.6 6.78024 17.1157 5.41887 15.6598C4.73916 14.9329 4.24956 14.2076 3.92937 13.6638C3.76896 13.3913 3.65015 13.1628 3.57053 13.0003C3.5307 12.9189 3.5006 12.854 3.47995 12.8081C3.46962 12.7851 3.46165 12.767 3.45599 12.7539L3.44924 12.7381L3.44716 12.7332L3.44644 12.7315L3.44593 12.7303C3.38468 12.5829 3.38468 12.4171 3.44593 12.2697L3.99999 12.5C3.44593 12.2697 3.44644 12.2685 3.44644 12.2685L3.44716 12.2668L3.44924 12.2619L3.45599 12.2461C3.46165 12.233 3.46962 12.2149 3.47995 12.1919C3.5006 12.146 3.5307 12.0811 3.57053 11.9998C3.65015 11.8372 3.76896 11.6087 3.92937 11.3362C4.24956 10.7924 4.73916 10.0671 5.41887 9.34021C5.66966 9.072 5.94716 8.80283 6.25221 8.54215ZM17.8 16.4129C18.0845 16.1663 18.3447 15.9126 18.5811 15.6598C19.2608 14.9329 19.7504 14.2076 20.0706 13.6638C20.231 13.3913 20.3498 13.1628 20.4295 13.0003C20.4693 12.9189 20.4994 12.854 20.52 12.8081C20.5304 12.7852 20.5383 12.767 20.544 12.7539L20.5507 12.7381L20.5528 12.7332L20.5535 12.7315C20.5535 12.7315 20.5541 12.7303 20 12.5L20.5541 12.7303C20.6153 12.5829 20.6151 12.4166 20.5538 12.2692L20.5528 12.2668L20.5507 12.2619L20.544 12.2461C20.5383 12.233 20.5304 12.2149 20.52 12.1919C20.4994 12.146 20.4693 12.0811 20.4295 11.9998C20.3498 11.8372 20.231 11.6087 20.0706 11.3362C19.7504 10.7924 19.2608 10.0671 18.5811 9.34021C17.2197 7.8843 15.0715 6.40001 12 6.40001C10.664 6.40001 9.50277 6.6808 8.50493 7.11792L9.42801 8.041C10.1859 7.76672 11.0408 7.60001 12 7.60001C14.6428 7.60001 16.4945 8.86572 17.7046 10.1598C18.3106 10.8079 18.7496 11.4576 19.0365 11.945C19.1704 12.1725 19.2704 12.3632 19.3382 12.5C19.2704 12.6368 19.1704 12.8275 19.0365 13.055C18.7496 13.5424 18.3106 14.1921 17.7046 14.8402C17.476 15.0847 17.2245 15.3281 16.9492 15.5622L17.8 16.4129ZM20 12.5C20.5541 12.2697 20.5538 12.2692 20.5538 12.2692L20 12.5ZM14.7476 13.3606C14.8372 13.0904 14.8857 12.8014 14.8857 12.5C14.8857 10.9322 13.5719 9.70001 12 9.70001C11.7225 9.70001 11.453 9.73842 11.1973 9.81031L12.3145 10.9275C13.0332 11.0552 13.5732 11.6124 13.6701 12.2831L14.7476 13.3606ZM11.7989 14.0889L12.8776 15.1676C12.5999 15.2537 12.3048 15.3 12 15.3C10.4281 15.3 9.11428 14.0678 9.11428 12.5C9.11428 12.1717 9.1719 11.8581 9.27745 11.5674L10.3181 12.6081C10.372 13.3621 10.9846 13.9981 11.7989 14.0889Z"
                      fill="#2C2C2C"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.42424 3.87575C3.65856 3.64143 4.03845 3.64143 4.27277 3.87575L19.6877 19.2907C19.922 19.525 19.922 19.9049 19.6877 20.1392C19.4534 20.3735 19.0735 20.3735 18.8392 20.1392L3.42424 4.72428C3.18993 4.48996 3.18993 4.11006 3.42424 3.87575Z"
                      fill="#2C2C2C"
                    ></path>
                  </svg>
                </span>
                <div className="pw-meter-container pw-check-container">
                  <h6 className="title">Create a password that contains:</h6>

                  <p className="pw_val_in pw-check-item" id="pw_length">
                    Password must be at least 8 characters long.
                  </p>
                  <p className="pw_val_in pw-check-item" id="pw_character">
                    {' '}
                    Password must contain at least one special character.
                  </p>
                  <p className="pw_val_in pw-check-item" id="pw_number">
                    {' '}
                    Password must contain at least one number.{' '}
                  </p>
                  <p className="pw_val_in pw-check-item" id="pw_uppercase">
                    Password must contain at least one uppercase letter.{' '}
                  </p>
                </div>
              </div>
              <div className="form-item">
                <input
                  placeholder=" "
                  className="form-control checkCapsLock"
                  type="password"
                  data-val="true"
                  data-val-equalto="The password and confirmation password do not match."
                  data-val-required="Password is required."
                  data-val-equalto-other="*.Password"
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                />
                <label className="form-label" htmlFor="ConfirmPassword">
                  Confirm Password
                </label>
                <span
                  className="error-message mt-1 field-validation-valid"
                  data-valmsg-for="ConfirmPassword"
                  data-valmsg-replace="true"
                ></span>
                <span className="capsLock info-tooltip bottom">
                  Caps lock ON
                </span>
              </div>
              <div className="form-item form-button last-item">
                <button type="submit" className="btn btn-primary">
                  Reset password
                </button>
              </div>

              <input
                name="__RequestVerificationToken"
                type="hidden"
                value="CfDJ8OjMYhxYkU5Oqb7lsqnWOacrq0IdrxMch89pNmWS8Nl-RSysVjjMZ9FU86D2HUNB1tjzR9FRraQX3RVT6H5WXU_nnl4iXSrQKT1rhlRBg6MCPgXp3FkaG4KSZKpfbEfXovYdzU-oYEfW-yTkIw5h2H0"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
