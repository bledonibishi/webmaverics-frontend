import React from 'react'
import { Form, FormGroup, Input, Label, Row } from 'reactstrap'
import './signup.css'
import { FormSelect } from 'react-bootstrap'
import axiosInstance from '../../../../api/axiosInstance'
import axios from 'axios'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'

function Signup() {
  const axiosPrivate = useAxiosPrivate()
  const submitHandler = async (event) => {
    event.preventDefault()
    const credentials = {
      name: 'signup6',
      email: 'testsignup6@gmail.com',
      password: 'test1234',
      passwordConfirm: 'test1234',
    }
    try {
      const promise = await axiosPrivate.post(
        'api/v1/users/signup',
        credentials
      )
      const token = promise.data.token
      localStorage.setItem('token', token)

      console.log('response.data', promise.data)
    } catch (error) {
      console.log('error', error)
    }
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
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input
                type="password-confirm"
                name="password-confirm"
                id="password-confirm"
                placeholder="Password Confirm"
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input type="emri" name="emri" id="emri" placeholder="Emri" />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <Input
                type="mbiemri"
                name="mbiemri"
                id="mbiemri"
                placeholder="Mbiermi"
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="exampleEmail">Email</Label> */}
              <FormSelect>
                <option value="0">Gjinia</option>
                <option value="1">Mashkull</option>
                <option value="2">Femer</option>
              </FormSelect>
            </FormGroup>

            <Row>
              <FormGroup className="col-6">
                <FormSelect>
                  <option value="0">Kosove</option>
                  <option value="1">Shqiper</option>
                  <option value="2">Maqedoni</option>
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
                class="button button-primary reg-btn"
                id="event-btn"
              >
                <span class="gj">
                  {/* <img src="/Content/Images/gj_white.png" /> */}
                </span>
                Regjistrohu
              </button>
              <hr />
              <button type="submit" class="button button-facebook fb-btn">
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
