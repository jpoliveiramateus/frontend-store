import React from 'react';
import './styles.css';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';

function PaymentMethod() {
  return (
    <div>
      <div className="px-4 pt-4">
        <h5>Método de Pagamento</h5>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Boleto"
            name="radio-buttons-group"
          >
            <div className="d-flex gap-4 mt-3">
              <div>
                <FormControlLabel value="Boleto" control={<Radio />} label="Boleto" />
                <BsFillCreditCard2BackFill style={{ fontSize: '80px' }} />
              </div>

              <div>
                <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
                <BsFillCreditCard2BackFill style={{ fontSize: '80px' }} />
              </div>

              <div>
                <FormControlLabel value="MasterCard" control={<Radio />} label="MasterCard" />
                <BsFillCreditCard2BackFill style={{ fontSize: '80px' }} />
              </div>

              <div>
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