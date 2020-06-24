import React, { useState, useReducer } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import toastr from 'toastr';

import 'toastr/build/toastr.css';
import './form.css';

function loadingReducer(state, action) {
  switch (action.type) {
    case 'start': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'finish': {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function Mailchimp() {
  const [email, setEmail] = useState('');
  const [state, dispatch] = useReducer(loadingReducer, {
    loading: false,
  });
  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'start' });
    const response = await addToMailchimp(email);
    dispatch({ type: 'finish' });
    if (response.result === 'success') {
      toastr.success('You successfully subscribed to my blog ^^', 'Thank you');
    } else if (response.result === 'error') {
      let message = 'Something went wrong :(';
      if (response.msg.includes('subscribed')) {
        message = 'You already subscribed. Thank you.';
      }
      if (response.msg.includes('The email you entered is not valid.')) {
        message = 'The email you entered is not valid.';
      }
      toastr.warning(message, 'Please try again');
    }
  };
  return (
    <div id="mc_embed_signup">
      <form id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" onSubmit={handleSubmit} className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
          <h3>Subscribe</h3>
          <div className="mc-field-group">
            <label htmlFor="mce-EMAIL">Your Email:
            </label>
            <input type="email" value={email} onChange={handleEmail} name="EMAIL" className="required email" id="mce-EMAIL" />
          </div>
          <div className="clear">
            <button type="submit" className="button" disabled={state.loading}> Subscribe</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Mailchimp;