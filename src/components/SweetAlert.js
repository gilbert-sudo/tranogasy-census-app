
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { useState } from 'react';
function SweetAlert(props) {
const SweetAlert = withSwalInstance(swal);
 const [show, setShow] =  useState(false);

  return (
    <div>
      <SweetAlert
        show={show}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => setShow(false)}
      />
    </div>
  );}
export default SweetAlert;