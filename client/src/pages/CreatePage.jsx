import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook';

const CreatePage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();
  const [link, setLink] = useState('');

  const pressHandler = async e => {
    if (e.key !== 'Enter') return;

    try {

      const data = await request('/api/links/generate', 'POST', { from: link }, {
        Authorization: 'Bearer ' + auth.token
      });

      if (data && data.link) {
        history.push(`/detail/${data.link._id}`);
      }
    } catch (error) { }
  }

  return (
    <div className='create-link row'>
      <div className="col s8 offset-s2">

        <h4 className="teal-text text-lighten-1">Cоздать ссылку</h4>

        <div className="input-field">
          <input
            value={link}
            onChange={e => setLink(e.target.value)}
            id="link"
            required
            type="text"
            className="validate"
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>

      </div>
    </div>
  )
}

export default CreatePage;