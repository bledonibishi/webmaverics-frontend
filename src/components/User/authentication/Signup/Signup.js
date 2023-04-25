import React from 'react'
import { Form, FormGroup, Input, Label, Row } from 'reactstrap'
import './signup.css'
import { FormSelect } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, userLogin } from '../../../../store/auth/authSlice'
import axiosInstance from '../../../../api/axiosInstance'
import { useEffect } from 'react'
import { useState } from 'react'
import { reset, signup } from '../../../../store/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isSuccess, isError, message, isLoading, countries } =
    useSelector((state) => state.auth)
  console.log(
    'state.auth',
    useSelector((state) => state.auth)
  )
  const [userFormData, setUserFormData] = useState({})
  // console.log('userState', userState)
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  useEffect(() => {
    if (isError) {
      // Toast.error(message)
      console.log('message isError')
    }

    if (isSuccess || user) {
      // navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    const credentials = {
      name: 'user4',
      surname: 'user4',
      gender: 'Female',
      country: '6445a51700404290d448bc72',
      city: '6445a35300404290d448bc52',
      email: 'user4@gmail.com',
      password: 'user1234',
      passwordConfirm: 'user1234',
      birthYear: 2000,
      birthMonth: 3,
      birthDay: 19,
    }

    if (userFormData.password !== userFormData.passwordConfirm) {
      // toast.error()
      console.log('Password do not match!')
    } else {
      // const userData = userFormData

      dispatch(signup(credentials))
    }
    // try {
    //   const promise = await axiosInstance.post(
    //     'api/v1/users/signup',
    //     credentials
    //   )
    //   if (promise) dispatch(userLogin())
    //   const token = promise.data.token
    //   localStorage.setItem('token', token)

    //   console.log('response.data', promise.data)
    // } catch (error) {
    //   console.log('error', error)
    // }
  }
  return (
    <div id="signup">
      <div className="d-flex align-items-center">
        <div className="col-6 info-panel">
          <h1>Njo llogari per te gjitha produktet e gjirafa</h1>
          <p className="d-block">
            Regjistrohu tani për të vazhduar në{' '}
            <strong style={{ color: '#e65228' }}>gjirafa50.com</strong>
          </p>
          <ul className="gjirafa-list">
            <li className="gjirafa-item">
              <span class="info">
                gjirafa.com
                <i>Kërko në gjuhen tënde</i>
              </span>
            </li>
            <li className="gjirafa-item">
              <span class="info">
                gjirafa.biz
                <i>Të gjitha bizneset dhe pikat e interesit</i>
              </span>
            </li>
            <li className="gjirafa-item">
              <span class="info">
                gjirafa50.com
                <i>
                  Blej online tani! Produktet më të kërkuara në tregun shqiptar
                </i>
              </span>
            </li>
            <li className="gjirafa-item">
              <span class="info">
                gjirafa AdNetwork
                <i> Rrjeti I reklamimit në të gjithë ueb-in shqip</i>
              </span>
            </li>
            <li className="gjirafa-item">
              <span class="info">
                video.gjirafa.com
                <i> Video platforma shqiptare</i>
              </span>
            </li>
            <li className="gjirafa-item">
              <span class="info">
                gjirafamall.com
                <i>Për ty, menjëherë!</i>
              </span>
            </li>
          </ul>

          <div className="premium__div" style={{ height: '45px' }}>
            <button>Behu premium</button>
            <button className="no-bg">Behu premium</button>
          </div>
        </div>
        <div className="col-6 form-container">
          <Form onSubmit={submitHandler}>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="E-Mail"
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input
                type="password"
                name="password-confirm"
                id="password-confirm"
                placeholder="Password Confirm"
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Emri"
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="surname"
                id="surname"
                placeholder="Mbiermi"
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <FormSelect>
                <option value="0">Gjinia</option>
                <option value="1">Mashkull</option>
                <option value="2">Femer</option>
              </FormSelect>
            </FormGroup>

            <Row>
              <FormGroup className="col-6">
                <FormSelect
                  name="country"
                  onClick={(event) => handleChange(event)}
                >
                  {countries.data &&
                    countries.data.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </FormSelect>
              </FormGroup>
              <FormGroup className="col-6">
                <FormSelect>
                  <option value="0">Prishtine</option>
                  <option value="1">Vushtrri</option>
                  <option value="2">Gjilan</option>
                </FormSelect>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup className="col-4">
                <FormSelect>
                  <option value="0">Dita e lindjes</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </FormSelect>
              </FormGroup>
              <FormGroup className="col-4">
                <FormSelect>
                  <option value="0">Muaji i lindjes</option>
                  <option value="1">Janar</option>
                  <option value="2">Shkurt</option>
                </FormSelect>
              </FormGroup>
              <FormGroup className="col-4">
                <FormSelect>
                  <option value="0">Viti i lindjes</option>
                  <option value="1">2000</option>
                  <option value="2">2001</option>
                </FormSelect>
              </FormGroup>
            </Row>

            <span
              style={{
                display: 'inline-block',
                fontSize: '14px',
                lineHeight: '10px',
                paddingBottom: '20px',
              }}
            >
              <input type="checkbox" className="mr-3" />
              Unë i pranoj Kushtet e përdorimit{' '}
              <a
                target="_blank"
                href="https://gjirafa.com/Top/Terms"
                style={{ color: '#e67e22', fontWeight: 'bold' }}
              >
                Kushtet e përdorimit
              </a>
            </span>

            <div className="form-buttons">
              <button
                type="submit"
                className="button button-primary reg-btn"
                id="event-btn"
              >
                <span class="gj">
                  {/* <img src="/Content/Images/gj_white.png" /> */}
                </span>
                Regjistrohu
              </button>
              <hr />
              <button
                type="button"
                onClick={() => dispatch(userLogin())}
                className="button button-facebook fb-btn"
              >
                <span class="fb">
                  {/* <img src="/Content/Images/fb_white.png"> */}
                </span>
                Regjistrohu me Facebook
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup
