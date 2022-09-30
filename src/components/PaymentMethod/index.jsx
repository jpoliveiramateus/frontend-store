import React from 'react';
import './styles.css';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { FaBarcode, FaCcMastercard, FaCcVisa } from 'react-icons/fa';

function PaymentMethod() {
  return (
    <div>
      <div className="d-flex flex-column align-items-start px-4 pt-4">
        <h5 className="align-self-start">Método de Pagamento</h5>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Boleto"
            name="radio-buttons-group"
          >
            <div className="d-flex flex-column flex-md-row gap-1 gap-md-3 mt-3">
              <div className="d-flex justify-content-between">
                <FormControlLabel value="Boleto" control={<Radio />} label="Boleto" />
                <FaBarcode style={{ fontSize: '80px' }} />
              </div>

              <div  className="d-flex justify-content-between">
                <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
                <FaCcVisa style={{ fontSize: '80px' }} />
              </div>

              <div className="d-flex justify-content-between">
                <FormControlLabel value="MasterCard" control={<Radio />} label="MasterCard" />
                <FaCcMastercard style={{ fontSize: '80px' }} />
              </div>

              <div className="d-flex justify-content-between">
                <FormControlLabel value="Elo" control={<Radio />} label="Elo" />
                <BsFillCreditCard2BackFill style={{ fontSize: '80px' }} />
              </div>
            </div>
          </RadioGroup>
          <button className="purchase-button">
            Comprar
          </button>
      </div>
    </div>
  )
}

export default PaymentMethod;