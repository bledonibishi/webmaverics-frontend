import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './style.css'
import WrappingCard from '@/ui/WrappingCard'
import UserInfoHeader from '@/components/User/Customer/DetailView/Header/UserInfoHeader'

const UserInfo = () => {
  return (
    <>
      <WrappingCard padding="12px" marginBtm="20px">
        <UserInfoHeader />
      </WrappingCard>
      <WrappingCard marginBtm="20px" padding="12px">
        <Form className="personal-info__details">
          <div className="personal-info_topdiv">
            <div className="personal-info__input">
              <label>Emri *</label>
              <input type="text" value={'bledon'} />
              <p className="text-danger pb-2 text-xs">
                Hapësira 'Emri' nuk duhet të jetë e zbrazët!
              </p>
            </div>
            <div className="personal-info__input">
              <label>Mbiemri *</label>
              <input type="text" value={'bledon'} />
            </div>
            <div className="personal-info__input">
              <label>Email *</label>
              <input type="text" value={'bledon'} />
            </div>
            <div className="personal-info__input">
              <label>Data e lindjes</label>
              <input type="text" value={'bledon'} />
            </div>
          </div>
          <div className="personal-info_topdiv">
            {/* {['radio'].map((type) => ( */}
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                name="group1"
                type={'radio'}
                label="Mashkull"
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                name="group1"
                type={'radio'}
                label="Femer"
                id={`inline-radio-2`}
              />
            </div>
            {/* ))} */}
          </div>
          <Button>RUAJ</Button>
        </Form>
      </WrappingCard>
    </>
  )
}

export default UserInfo
