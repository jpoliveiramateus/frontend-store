import React from 'react';
import { TextField } from '@mui/material';
import states from '../../__mocks__/states';
import './styles.css';

function Form() {
  return (
    <div className="p-4 border-bottom">
      <h5>Informações do comprador</h5>
      <form className="d-flex flex-column gap-3 mt-4">
        <div className="d-flex flex-column flex-md-row gap-3">
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Nome Completo" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="CPF" variant="outlined" size="small" />
          <TextField type="email" id="outlined-basic" className="flex-grow-1" label="Email" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Telefone" variant="outlined" size="small" />
        </div>
        <div className="d-flex flex-column flex-md-row gap-3">
          <TextField type="text" id="outlined-basic" className='flex-grow-2' label="CEP" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Endereço" variant="outlined" size="small" />
        </div>
        <div className="d-flex flex-column flex-md-row gap-3">
          <TextField type="text" id="outlined-basic" className='flex-grow-1' label="Complemento" variant="outlined" size="small" />
          <TextField type="number" id="outlined-basic" className="flex-grow-2" label="Número" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Cidade" variant="outlined" size="small" />
          <select
            name="state"
            id="state"
            className="p-2 flex align-items-center"
          >
            <option disabled defaultValue>Estado</option>
            {states.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default Form