import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export type UserInfo = {
  firstName: string;
  lastName: string;
  birthdate: Date;
  idNumber: string;
};

interface Props {
  onSubmit: (info: UserInfo) => void;
}
export const FakeKycForm = ({ onSubmit }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(new Date(1970, 1, 1));
  const [idNumber, setIdNumber] = useState('');

  return (
    <div className="form-container">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            firstName,
            lastName,
            idNumber,
            birthdate: birthdate as Date,
          });
        }}
      >
        <div className="form-group">
          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Birthdate</label>
          <DatePicker
            selected={birthdate}
            required
            onChange={(date) => setBirthdate(date)}
            className="input"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="form-group">
          <label className="label">ID Number</label>
          <input
            type="text"
            className="input"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>

        <button type="submit" className="button">
          Issue SBT
        </button>
      </form>
    </div>
  );
};
